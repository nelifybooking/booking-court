const Express = require("express");
const Mongoose = require("mongoose");
const BodyParser = require("body-parser");
const Moment = require('moment')
const cors = require('cors')
require('dotenv').config()
const axios = require('axios');

var Schema = Mongoose.Schema;

Mongoose.connect(process.env.MONGODB_CONN_STR, {useNewUrlParser: true,  useUnifiedTopology: true}, function(err) {
  if (err) throw err
});

// var db = Mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function() {
//   // we're connected!
//   console.log('connected')
// });

var app = Express();

app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));

app.use(cors())

const defaultApiHeaders = {
  'Accept': 'application/json',
  'Accept-Encoding': 'gzip, deflate, br',
  'Accept-Language': 'en',
  'Cache-Control': 'no-cache',
  'Connection': 'keep-alive',
  'Content-Type': 'application/json; charset=utf-8',
  'Host': 'www.smartplay.lcsd.gov.hk',
  'Pragma': 'no-cache',
  'Referer': 'https://www.smartplay.lcsd.gov.hk/facilities/search-result?keywords=&district=all&startDate=2024-01-06&typeCode=BASC&venueCode=&sportCode=BAGM&typeName=%E7%B1%83%E7%90%83&frmFilterType=&venueSportCode=&isFree=false',
  'Sec-Fetch-Dest': 'empty',
  'Sec-Fetch-Mode': 'cors',
  'Sec-Fetch-Site': 'same-origin',
  'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  'channel': 'INTERNET',
  'sec-ch-ua': '"Not_A Brand";v="8", "Chromium";v="120", "Google Chrome";v="120"',
  'sec-ch-ua-mobile': '?0',
  'sec-ch-ua-platform': '"macOS"'
}


Number.prototype.pad = function(size) {
  var s = String(this);
  while (s.length < (size || 2)) {s = "0" + s;}
  return s;
}

var districtSchema = new Mongoose.Schema({
  area_id: Number,
  area_code: String,
  area_enName: String,
  area_tcName: String,
  area_scName: String,
  dist_id: Number,
  dist_code: String,
  dist_enName: String,
  dist_tcName: String,
  dist_scName: String
  // area: {type:Schema.Types.ObjectId, ref: 'area'}
}, { collection: 'district'});

var ssnSchema = new Mongoose.Schema({
  fa_code: String,
  ssn_code: Number,
  ssn_StartDate: Date,
  ssn_StartTime: String,
  ssn_EndTime: String,
  available: Boolean,
  peakHour: Boolean,
  ssn_cnt: Number
})

var venueSchema = new Mongoose.Schema({
  dist_code: String,
  venue_id: Number,
  venue_imageUrl: String,
  venue_enName: String,
  venue_tcName: String,
  venue_scName: String,
  sessions: [ssnSchema]
}, { collection: 'venue' })

var facilitySchema = new Mongoose.Schema({
  fa_id: Number,
  fa_code: String,
  fa_enName: String,
  fa_tcName: String,
  fa_scName: String
}, { collection: 'facility' })

var dataInfoSchema = new Mongoose.Schema({
  fa_code: String,
  day: String,
  modified_date: Date
}, { collection: 'data_info' })

var DistrictModel = new Mongoose.model('district', districtSchema);
var FacilityModel = new Mongoose.model('facility', facilitySchema);
var VenueModel = new Mongoose.model('venue', venueSchema);
var DataInfoModel = new Mongoose.model('data_info', dataInfoSchema);

async function getAll(model, fields, search, showSubData, subDataName, subDataFields, subSearch) {
  // var crtInfo = await CourtInfoModel.findOne({_id: '5d774c1f7d6e7099e683dae2'}).populate('records')
  // return crtInfo
  let records = []

  if (showSubData) {
    records = await model.find(search)
                          .select(fields)
                          .populate({
                                      path: subDataName,
                                      select: subDataFields,
                                      match: subSearch
                                    })
                          .exec()
  }
  else {
    records = await model.find(search).select(fields).exec()
  }

  return records
}

async function getUpdateDate (info_type, day = null) {
  const query = { info_type: info_type, day: day }
  const record = await getAll(DataInfoModel, null, query, false, null, null, {})
  return record
}

async function updateLastActiveDateTime(fa_code) {
  let utc = new Date()
  utc.setHours( utc.getHours() + 8);
  try {
    const result = await DataInfoModel.findOneAndUpdate({info_type: `LAST_ACTIVE_DATETIME_${fa_code}`}, { modified_date: utc.toISOString()})
    result.save()
    return result
  } catch(err) {
    console.log(err)
    return null
  }
  
}

// app.post('/updateDataInfo', async(req, res) => {
//   const result = await updateLastActiveDateTime()
//   res.json(result)
// })

app.get('/updatedate', async(req, res) => {
  let {info_type, day} = req.query
  const record = await getUpdateDate(info_type, day)
  res.json(record)
})

app.get('/district', async (req, res) => {
  let showSubData = (req.query.sub == 't')
  let temp = await getAll(DistrictModel, null, {}, showSubData, null, null, {})
  let record = []
  let currArea = null

  for (const item of temp) {
    if (currArea == null || currArea.area_code !== item.area_code) {
      if (currArea !== null)
        record = [...record, currArea]
      currArea = {
        area_id: item.area_id,
        area_code: item.area_code,
        area_enName: item.area_enName,
        area_tcName: item.area_tcName,
        area_scName: item.area_scName,
        districts: []
      }      
    }
    currArea.districts.push({
      dist_id: item.dist_id,
      dist_code: item.dist_code,    
      dist_enName: item.dist_enName,
      dist_tcName: item.dist_tcName,
      dist_scName: item.dist_scName,
    })
  }
  record = [...record, currArea]

  res.json(record)
})

app.get('/facility', async (req, res) => {
  let showSubData = (req.query.sub == 't')
  let record = await getAll(FacilityModel, null, {}, showSubData, null, null, {})
  res.json(record)
})

const getVenue = async (req) => {
  let showSubData = (req.query.sub == 't')
  return await getAll(VenueModel, ['-sessions'], {}, showSubData, null, null, {})  
}

app.get('/venue', async (req, res) => {
  res.json(await getVenue(req))
})

app.get('/session', async (req, res) => {
  const { fa_code } = req.query
  const result = updateLastActiveDateTime(fa_code)
  const dataInfo = await getUpdateDate(`SSN_${fa_code}`)
  // console.log(dataInfo)

  let query = { 'sessions.ssn_cnt': { $gt : 0 } }
  // let query = {}
  let showSubData = (req.query.sub == 't')
  let venue_id = req.query.venue_id?.split(",")?.map(id => Number(id))
  // venue_id = venue_id.map(id => Number(id))
  if (typeof venue_id !== 'undefined')
    query = {...query, 'venue_id': {$in: venue_id }}

  if (typeof fa_code !== 'undefined')
    query = {...query, 'sessions.fa_code': fa_code}

  // console.log (query)

  let records = await VenueModel.aggregate([
    { $unwind: '$sessions' },
    { $match: query },
    { $group: { _id: {
      "_id": "$_id",
      dist_code: "$dist_code",
      venue_id: "$venue_id",
      venue_enName: "$venue_enName",
      venue_tcName: "$venue_tcName",
      venue_scName: "$venue_scName",
      venue_imageUrl: "$venue_imageUrl",
      venue_enAddr: "$venue_enAddr",
      venue_tcAddr: "$venue_tcAddr",
      venue_scAddr: "$venue_scAddr",
      venue_lat: "$venue_lat",
      venue_long: "$venue_long",
      venue_phone: "$venue_phone",
      venue_wkdayHr: "$venue_wkdayHr",
      venue_wkendHr: "$venue_wkendHr"
    }, sessions: { $push: "$sessions" } } },
    { $sort: { _id: 1, dist_code: 1, venue_id: 1 } }
  ])
  // let records = await getAll(VenueModel, null, query, showSubData, null, null, {})

  records = records.map((item) => {
    return {...item._id, sessions:item.sessions}
  })

  // for (let rec of records)
  //   rec.sessions = rec.sessions.filter(ssn => ssn.ssn_cnt>0)
  // console.log(records, dataInfo, dataInfo[0])
  let update_date = typeof dataInfo[0] === 'undefined' ? null : dataInfo[0].modified_date
  res.json({ update_date, fa_code, data: records })
})

// Get data directly from smartplay api
app.get('/courtrawdata', async (req, res) => {
  const { dateList, venueId } = req.query
  if (typeof dateList !== 'undefined' && dateList.length > 0) {
    let ssnDataList = []
    const aDateList = dateList.split(",")
    for (dt of aDateList)      
      ssnDataList.push(await getSession({...req.query, playDate: dt}))
    res.json(combineSsn({}, ssnDataList))
  } else {
    const ssnData = await getSession(req.query)
    if (typeof venueId !== 'undefined')
      res.json(ssnData)
    else
      res.json(combineSsn({}, [ssnData], req.query))
  }
})

const getSession = async (payload) => {
  const { distCode, playDate, faCode, fatId, venueId } = payload
  let url = ""
  const type = typeof venueId !== 'undefined' && !isNaN(parseInt(venueId))  && typeof fatId !== 'undefined' && !isNaN(parseInt(fatId)) ? 'ByVenueCourt' : 'ByVenue'

  if (type === 'ByVenueCourt') {
    // Get valiable court by venue and court
    url = `https://www.smartplay.lcsd.gov.hk/rest/facility-catalog/api/v1/publ/facilities/venues/${venueId}/court-type/1?playDate=${playDate}&fatId=${fatId}&faCode=${faCode}&frmFilterTypes=`
  } else {
    // Get available court by venue
    url = `https://www.smartplay.lcsd.gov.hk/rest/facility-catalog/api/v1/publ/facilities?faCode=${faCode}&playDate=${playDate}`
  }
  
  console.log(url)
  let result = await axios.get(url,  {headers: defaultApiHeaders})
  const ssnData = result.data.data
  return ssnData
}

const combineSsn = (combinedList, dataList, payload) => {
  const { playDate, faCode } = payload
  const periodList = ['morning', 'afternoon', 'evening']
  const key = `${faCode}_${playDate.replace(/-/g, "")}`

  let list = {}
  
  for (ssnData of dataList) {
    for (let index = 0; index<periodList.length; index++) {
      const period = ssnData[periodList[index]]
      for (dist of period.distList) {
        for (venue of dist.venueList) {
          const {venueId} = venue
          for (fat of venue.fatList) {
            for (ssn of fat.sessionList) {
              const {ssnStartTime, ssnEndTime, ssnStartDate, available, peakHour, sessionCount} = ssn
              if (!Object.hasOwn(list, venueId))
                list = {...list, [venueId]: []}
              if (sessionCount > 0) {
                list[venueId].push({
                  fa_code: faCode,
                  ssn_StartTime: ssnStartTime, 
                  ssn_EndTime: ssnEndTime, 
                  ssn_StartDate: ssnStartDate, 
                  available, 
                  peakHour, 
                  ssn_cnt: sessionCount
                })
              }
            }
          }
        }
      }      
    }
  }

  combinedList = {...combinedList, ...list}

  // TODO: Move this code to front end
  // for (venue of venueData) {
  //   if (typeof venue.sessions === 'undefined')
  //     venue.sessions = []
  //   if (typeof list[venue.venue_id] !== 'undefined' && list[venue.venue_id].length > 0)
  //     venue.sessions = [...venue.sessions, list[venue.venue_id]]
  // }

  return combinedList
}

// app.get('/test', (req, res) => {
//   const combinedList = require('./samples/combinedList.json')
//   const ssnData = require('./samples/byvenue.json')
//   const combined = combineSsn(combinedList, [ssnData])
//   res.json (combined)
// })

app.listen(3000, () => {
  console.log("Listening at :3000...");
});