const Express = require("express");
const Mongoose = require("mongoose");
const BodyParser = require("body-parser");
const Moment = require('moment')
const cors = require('cors')
require('dotenv').config()

var Schema = Mongoose.Schema;

Mongoose.connect(process.env.MONGODB_CONN_STR, {useNewUrlParser: true,  useUnifiedTopology: true});

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

var courtInfoSchema = new Mongoose.Schema({
  facilityVal: Number,
  facilityDisplay: String,
  facilityDisplayChi: String,
  typeVal: Number,
  typeDisplay: String,
  typeDisplayChi: String,
  areaVal: String,
  areaDisplay: String,
  address: String,
  phone: String,
  areaDisplayChi: String,
  venueVal: String,
  venueDisplay: String,
  venueDisplayChi: String,
  addressChi: String,
  records: [{type: Schema.Types.ObjectId, ref: 'record'}]
}, { collection: 'court_info'})

var timeslotSchema = new Mongoose.Schema({
  ts: String,
  status: String
});

var recordSchema = new Mongoose.Schema({
  facilityVal: Number,
  facilityDisplay: String,
  typeVal: Number,
  typeDisplay: String,
  areaVal: String,
  areaDisplay: String,
  dateVal: String,
  centreName: String,
  courtName: String,
  timeslots: [timeslotSchema],
  courtInfo: {type: Schema.Types.ObjectId, ref: 'court_info'},
  remark: String,
  createdt: String,  
}, { collection: 'record'});

// var recordSchema = new Mongoose.Schema({
//   uid: String,
//   courts: [courtSchema],
//   remark: String,
//   createdt: String
// }, { collection: 'record'});

var areaSchema = new Mongoose.Schema({
  code: String,
  area: String,
  areaChi: String,
  districts: [{type:Schema.Types.ObjectId, ref: 'district'}]
}, { collection: 'area'});

var districtSchema = new Mongoose.Schema({
  code: String,
  eng: String,
  chi: String,
  area: {type:Schema.Types.ObjectId, ref: 'area'}
}, { collection: 'district'});

var reviewSchema = new Mongoose.Schema({
  comment: String
}, { collection: 'review'})

var productSchema = new Mongoose.Schema({
  name: String,
  reviews: [{type: Schema.Types.ObjectId, ref: 'review'}]
}, { collection: 'product'})


var RecordModel = new Mongoose.model('record', recordSchema);
var CourtInfoModel = new Mongoose.model('court_info', courtInfoSchema);
var AreaModel = new Mongoose.model('area', areaSchema);
var DistrictModel = new Mongoose.model('district', districtSchema);

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

function getRecordSearchQuery(query) {
  let subSearch = {}
  // let curDate = new Date(Date.now())
  // let startDay = query.startDay
  // let endDay = query.endDay

  const {startDay = 0, endDay = 10} = query
  const curDt = typeof query.curDt === 'undefined' ? Moment().format('YYYY/MM/DD') : query.curDt

  let curDate = new Date(curDt)
   
  // if (startDay >= 0) {
    // subSearch = {dateVal: {$gte: startDay, $lte: endDay}}
    let startDate = new Date(curDt)
    startDate.setDate(curDate.getDate() + parseInt(startDay))
    let sStartDate = startDate.getFullYear()+''+(startDate.getMonth()+1).pad(2)+''+startDate.getDate().pad(2)

    // console.log(sStartDate)

    subSearch = {dateVal: {$gte: sStartDate}}
  // }

  // if (endDay >= 0) {
    let endDate = new Date(curDt)
    endDate.setDate(curDate.getDate() + parseInt(endDay))
    let sEndDate = endDate.getFullYear()+''+(endDate.getMonth()+1).pad(2)+''+endDate.getDate().pad(2)

    // console.log(sEndDate)

    if (subSearch == {})
      subSearch = {dateVal: {$lte: sEndDate}}
    else
      subSearch.dateVal = {...subSearch.dateVal, $lte: sEndDate}
  // }

  console.log(subSearch)
  return subSearch
}


app.get('/courtinfos', async (req, res) => {
  let showSubData = (req.query.sub == 't')
  let subSearch = getRecordSearchQuery(req.query)
  let record = await getAll(CourtInfoModel, {}, {}, showSubData, 'records', 'centreName courtName dateVal timeslots', subSearch)
  res.send(record)
})

app.get('/courtinfos/:id', async (req, res) => {
  let showSubData = (req.query.sub == 't')
  let id = req.params.id
  let subSearch = getRecordSearchQuery(req.query)

  let record = await getAll(CourtInfoModel, {}, {_id:id}, showSubData, 'records', 'centreName courtName dateVal timeslots', subSearch)
  res.send(record)
})

app.get('/records', async (req, res) => {
  let showSubData = (req.query.sub == 't')
  let record = await getAll(RecordModel, 'centreName courtName dateVal timeslots', {}, showSubData, 'courtInfo', '_id', {})
  res.send(record)
})

app.get('/areas', async (req, res) => {
  let showSubData = (req.query.sub == 't')
  let record = await getAll(AreaModel, null, {}, showSubData, 'districts', null, {})
  res.json(record)
})

app.get('/districts', async (req, res) => {
  let showSubData = (req.query.sub == 't')
  let record = await getAll(DistrictModel, null, {}, showSubData, 'area', null, {})
  res.json(record)
})

app.get('/test/:id', async (req, res) => {
  let search = {_id: req.params.id}
  let courts = await CourtInfoModel.find({_id: '5d774c237d6e7099e683db3f'})
                                    .populate({
                                      path: 'records',
                                      select: 'centreName courtName dateVal timeslots',
                                      match: {dateVal:'20200611'},
                                      options: { 
                                        sort: { 
                                          'dateVal': -1
                                        } 
                                      } 
                                    });
                                    
  // let records = await courts[0].records

  
  let timeslots = {}
  
  courts.forEach((crt) => {
    timeslots = {}
    crt.records.forEach((rec) => {
      rec.timeslots.forEach((timeslot) => {
        if (timeslot.status != '') {
          if (typeof timeslots[timeslot.ts] == 'undefined')
            timeslots[timeslot.ts] = 1
          else
            timeslots[timeslot.ts] ++
        }
      })
    })
    console.log(crt._id, timeslots)
  })

  

  // console.log(court[0].records)

  res.json(courts)
})


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