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


Number.prototype.pad = function(size) {
  var s = String(this);
  while (s.length < (size || 2)) {s = "0" + s;}
  return s;
}

// var courtInfoSchema = new Mongoose.Schema({
//   facilityVal: Number,
//   facilityDisplay: String,
//   facilityDisplayChi: String,
//   typeVal: Number,
//   typeDisplay: String,
//   typeDisplayChi: String,
//   areaVal: String,
//   areaDisplay: String,
//   address: String,
//   phone: String,
//   areaDisplayChi: String,
//   venueVal: String,
//   venueDisplay: String,
//   venueDisplayChi: String,
//   addressChi: String,
//   records: [{type: Schema.Types.ObjectId, ref: 'record'}]
// }, { collection: 'court_info'})

// var timeslotSchema = new Mongoose.Schema({
//   ts: String,
//   status: String
// });

// var recordSchema = new Mongoose.Schema({
//   facilityVal: Number,
//   facilityDisplay: String,
//   typeVal: Number,
//   typeDisplay: String,
//   areaVal: String,
//   areaDisplay: String,
//   dateVal: String,
//   centreName: String,
//   courtName: String,
//   timeslots: [timeslotSchema],
//   courtInfo: {type: Schema.Types.ObjectId, ref: 'court_info'},
//   remark: String,
//   createdt: String,  
// }, { collection: 'record'});

// // var recordSchema = new Mongoose.Schema({
// //   uid: String,
// //   courts: [courtSchema],
// //   remark: String,
// //   createdt: String
// // }, { collection: 'record'});

// var areaSchema = new Mongoose.Schema({
//   code: String,
//   area: String,
//   areaChi: String,
//   districts: [{type:Schema.Types.ObjectId, ref: 'district'}]
// }, { collection: 'area'});

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



// var reviewSchema = new Mongoose.Schema({
//   comment: String
// }, { collection: 'review'})

// var productSchema = new Mongoose.Schema({
//   name: String,
//   reviews: [{type: Schema.Types.ObjectId, ref: 'review'}]
// }, { collection: 'product'})


// var RecordModel = new Mongoose.model('record', recordSchema);
// var CourtInfoModel = new Mongoose.model('court_info', courtInfoSchema);
// var AreaModel = new Mongoose.model('area', areaSchema);

var DistrictModel = new Mongoose.model('district', districtSchema);
var FacilityModel = new Mongoose.model('facility', facilitySchema);
var VenueModel = new Mongoose.model('venue', venueSchema);
var DataInfoModel = new Mongoose.model('data_info', dataInfoSchema);

// var ProductModel = new Mongoose.model('product', productSchema)
// var ReviewModel = new Mongoose.model('review', reviewSchema)

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

// function getRecordSearchQuery(query) {
//   let subSearch = {}
//   // let curDate = new Date(Date.now())
//   // let startDay = query.startDay
//   // let endDay = query.endDay

//   const {startDay = 0, endDay = 10} = query
//   const curDt = typeof query.curDt === 'undefined' ? Moment().format('YYYY/MM/DD') : query.curDt

//   let curDate = new Date(curDt)
   
//   // if (startDay >= 0) {
//     // subSearch = {dateVal: {$gte: startDay, $lte: endDay}}
//     let startDate = new Date(curDt)
//     startDate.setDate(curDate.getDate() + parseInt(startDay))
//     let sStartDate = startDate.getFullYear()+''+(startDate.getMonth()+1).pad(2)+''+startDate.getDate().pad(2)

//     // console.log(sStartDate)

//     subSearch = {dateVal: {$gte: sStartDate}}
//   // }

//   // if (endDay >= 0) {
//     let endDate = new Date(curDt)
//     endDate.setDate(curDate.getDate() + parseInt(endDay))
//     let sEndDate = endDate.getFullYear()+''+(endDate.getMonth()+1).pad(2)+''+endDate.getDate().pad(2)

//     // console.log(sEndDate)

//     if (subSearch == {})
//       subSearch = {dateVal: {$lte: sEndDate}}
//     else
//       subSearch.dateVal = {...subSearch.dateVal, $lte: sEndDate}
//   // }

//   console.log(subSearch)
//   return subSearch
// }


// app.get('/courtinfos', async (req, res) => {
//   let showSubData = (req.query.sub == 't')
//   let subSearch = getRecordSearchQuery(req.query)
//   let record = await getAll(CourtInfoModel, {}, {}, showSubData, 'records', 'centreName courtName dateVal timeslots', subSearch)
//   res.send(record)
// })

// app.get('/courtinfos/:id', async (req, res) => {
//   let showSubData = (req.query.sub == 't')
//   let id = req.params.id
//   let subSearch = getRecordSearchQuery(req.query)

//   let record = await getAll(CourtInfoModel, {}, {_id:id}, showSubData, 'records', 'centreName courtName dateVal timeslots', subSearch)
//   res.send(record)
// })

// app.get('/records', async (req, res) => {
//   let showSubData = (req.query.sub == 't')
//   let record = await getAll(RecordModel, 'centreName courtName dateVal timeslots', {}, showSubData, 'courtInfo', '_id', {})
//   res.send(record)
// })

// app.get('/areas', async (req, res) => {
//   let showSubData = (req.query.sub == 't')
//   let record = await getAll(AreaModel, null, {}, showSubData, 'districts', null, {})
//   res.json(record)
// })

async function getUpdateDate (info_type, day = null) {
  const query = { info_type: info_type, day: day }
  const record = await getAll(DataInfoModel, null, query, false, null, null, {})
  return record
}

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

app.get('/venue', async (req, res) => {
  let showSubData = (req.query.sub == 't')
  let record = await getAll(VenueModel, '-sessions', {}, showSubData, null, null, {})
  res.json(record)
})

app.get('/session', async (req, res) => {  
  const { fa_code } = req.query
  const dataInfo = await getUpdateDate('SSN')
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
    }, sessions: { $push: "$sessions" } } }
  ])
  // let records = await getAll(VenueModel, null, query, showSubData, null, null, {})

  records = records.map((item) => {
    return {...item._id, sessions:item.sessions}
  })

  // for (let rec of records)
  //   rec.sessions = rec.sessions.filter(ssn => ssn.ssn_cnt>0)

  res.json({ update_date: dataInfo[0].modified_date, data: records })
})

// app.get('/test/:id', async (req, res) => {
//   let search = {_id: req.params.id}
//   let courts = await CourtInfoModel.find({_id: '5d774c237d6e7099e683db3f'})
//                                     .populate({
//                                       path: 'records',
//                                       select: 'centreName courtName dateVal timeslots',
//                                       match: {dateVal:'20200611'},
//                                       options: { 
//                                         sort: { 
//                                           'dateVal': -1
//                                         } 
//                                       } 
//                                     });
                                    
//   // let records = await courts[0].records

  
//   let timeslots = {}
  
//   courts.forEach((crt) => {
//     timeslots = {}
//     crt.records.forEach((rec) => {
//       rec.timeslots.forEach((timeslot) => {
//         if (timeslot.status != '') {
//           if (typeof timeslots[timeslot.ts] == 'undefined')
//             timeslots[timeslot.ts] = 1
//           else
//             timeslots[timeslot.ts] ++
//         }
//       })
//     })
//     console.log(crt._id, timeslots)
//   })

  

//   // console.log(court[0].records)

//   res.json(courts)
// })


// app.get('/hsbc', async (req, res) => {
//   axios.post( 
//     'https://rbwm-api.hsbc.com.hk/digital-pws-tools-mortgages-eapi-prod-proxy/v1/mortgages/property-valuation-tool',
//     {"locale":"en_HK","locate":null,"zoneId":null,"districtId":null,"estateId":null,"blockId":null,"floor":null},
//     {
//       headers: {
//         'Content-Type': 'application/json',
//         'Access-Control-Allow-Origin': 'http://localhost:3000',
//         'Access-Control-Allow-Methods': 'GET,POST',
//         'Access-Control-Allow-Headers': 'Content-Type, Authorization',
//         'client_id':'5eca677638ab454086052a18da4e2cb0',
//         'client_secret':'d35073Cf96B64b1E9CE25f4E07746300'        
//       }
//     }
//   )
//   .then(function (response) {
//     console.log(response.data.zoneList);
//   })
//   .catch(function (error) {
//     console.log(error);
//   });  
//   res.json({result: 'ok'})
// })

// async function getRecord() {

//   // var product = new ProductModel({'name': 'Mac Book'})
//   // var result = await product.save();

//   // var review = new ReviewModel({'comment': 'SO SO'})
//   // var result = await review.save();

//   // console.log(result)

//   // var product = await ProductModel.findOneAndUpdate({_id: '5ed742492a56af15b0b77abe'}, 
//   //   {$push: {reviews: result._id}}, {upsert: true, useFindAndModify: false})

//   // var product = await ProductModel.findOne({_id: '5ed742492a56af15b0b77abe'}).populate('reviews')
  
//   // console.log(product)

//   // var area = await AreaModel.find().populate('districts')
//   // console.log(area)

//   // var district = await DistrictModel.find().populate('area', ['code', 'area', 'areaChi'])
//   // console.log(district[0])

//   var crtInfo = await CourtInfoModel.findOne({_id: '5d774c1f7d6e7099e683dae2'}).populate('records')

//   // CourtInfoModel.find().distinct('')

//   return crtInfo

//   // var records = await RecordModel.find().select('centreName courtName').populate('courtInfo', '_id')
//   // return records[0]
// }


// app.get("/area", async(req, res) => {
//   try {
//     var result = await AreaModel.find().exec();
//     console.log(result)
//     res.send(result);
//   } catch (err) {
//     res.status(500).send(err)
//   }
// }) 


// app.get("/record", async (request, response) => {
//   try {
//     var result = await getRecord();
//     response.send(result);
//   } catch (error) {
//     response.status(500).send(error);
//   }
// });

// app.get("/courtinfo", async (request, response) => {
//   try {
//     var result = await CourtInfoModel.find().exec();
//     response.send(result);
//   } catch (error) {
//     response.status(500).send(error);
//   }
// });

// // app.post("/record", async (request, response) => {
// //   try {
// //       var record = new RecordModel(request.body);
// //       var result = await record.save();
// //       response.send(result);
// //   } catch (error) {
// //       response.status(500).send(error);
// //   }
// // });

// async function getRecord() {
//   var curDt = getCurDateStr()

//   var record = await RecordModel.find({uid:{ $gte: curDt} }).exec()
//   var courtInfo = await CourtInfoModel.find().exec()  

//   for (var rIndex=0; rIndex < record.length; rIndex++) {
//     var rec = record[rIndex]

//     for (var cIndex = 0; cIndex < rec.courts.length; cIndex++) {
//       var crt = rec.courts[cIndex]
//       var temp = crt.centreName.split("-")
//       var centreName = temp[0].trim()

//       for (var iIndex = 0; iIndex < courtInfo.length; iIndex++) {
//         var crtInfo = courtInfo[iIndex]

//         if (centreName == crtInfo.venueDisplay) {
//           crt["courtInfo"] = crtInfo
//           break
//         }
//       }      
//     }
//   }
  
//   return record
// }


// function getCurDateStr() {
//   var d = new Date()

//   var yr = d.getFullYear().toString()
  
//   var mth = d.getMonth() + 1
  
//   if (mth.toString().length == 1)
//     mth = '0' + mth.toString()
  
//   var dt = d.getDate().toString()
  
//   if (dt.length == 1)
//     dt = '0' + dt
  
//   return yr+mth+dt
// }



// // var contactSchema = new Mongoose.Schema({
// //   type: String,
// //   contact: String
// // });

// // var personSchema = new Mongoose.Schema({
// //   firstname: String,
// //   lastname: String,
// //   contacts: [contactSchema]
// // }, {collection: 'person'})

// // const ContactModel = Mongoose.model("contact", contactSchema);
// // const PersonModel = Mongoose.model("person", personSchema);
  
// // app.post("/person", async (request, response) => {
// //   try {
// //       var person = new PersonModel(request.body);
// //       var result = await person.save();
// //       response.send(result);
// //   } catch (error) {
// //       response.status(500).send(error);
// //   }
// // });

// // app.get("/people", async (request, response) => {
// //   try {
// //       var result = await PersonModel.find().exec();
// //       response.send(result);
// //   } catch (error) {
// //       response.status(500).send(error);
// //   }
// // });

// // app.get("/person/:id", async (request, response) => {
// //   try {
// //       var person = await PersonModel.findById(request.params.id).exec();
// //       response.send(person);
// //   } catch (error) {
// //       response.status(500).send(error);
// //   }
// // });

// // app.put("/person/:id", async (request, response) => {
// //   try {
// //       var person = await PersonModel.findById(request.params.id).exec();
// //       person.set(request.body);
// //       var result = await person.save();
// //       response.send(result);
// //   } catch (error) {
// //       response.status(500).send(error);
// //   }
// // });

// // app.delete("/person/:id", async (request, response) => {
// //   try {
// //       var result = await PersonModel.deleteOne({ _id: request.params.id }).exec();
// //       response.send(result);
// //   } catch (error) {
// //       response.status(500).send(error);
// //   }
// // });



app.listen(3000, () => {
  console.log("Listening at :3000...");
});