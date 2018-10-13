var path = require('path');
var bodyParser = require('body-parser');
var express = require('express');

var JSZip = require('jszip');
var Docxtemplater = require('docxtemplater');

var fs = require('fs');
var path = require('path');

var BuildOptions = require('./local_modules/OptionsBuilder');

//router
var docxRouter = express.Router();

function parseDate(dateVal) {
	let values = dateVal.split('.');
	let parsedDate = {
		day: values[0] || '',
		month: values[1] || '',
		year: values[2] || ''
	};
	return parsedDate;
}

function getMonth(monthNum) {
	let monthWord = {
		'01': 'января',
		'02': 'февраля',
		'03': 'марта',
		'04': 'апреля',
		'05': 'мая',
		'06': 'июня',
		'07': 'июля',
		'08': 'августа',
		'09': 'сентября',
		'10': 'октября',
		'11': 'ноября',
		'12': 'декабря',
		'default' : ''
	}
	
	return (monthWord[monthNum] || monthWord['default']);
}

function formatOptions(options, checks, pOpts, pStr, delim, isBold) {	
	let str = new BuildOptions();
	
	str.paragraph(pOpts, pStr);
	
	for (let [index, item] of checks.entries()) {
		str.option(options[index], item, isBold);
		if(index !== (checks.length - 1)) {
			str.delimiter(delim);
		}
	}
	
	return str.fetch();
}

//support json encoded bodies
docxRouter.use(bodyParser.json());
//support encoded bodies
docxRouter.use(bodyParser.urlencoded({ extended: true }));
//force loading index.hmlt from frontend directory
docxRouter.get('/', function(req, res, next) {
    res.sendFile(path.join(__dirname + '/frontend/index.html'));
});
//after GET '/'
//backend.use(express.static('frontend'));

docxRouter.post('/getdocx', function(req, res, next) {
	
	let someJSON = req.body.jsonStr;

	let readyObj = JSON.parse(someJSON);
	
	//Load the docx file as a binary
	var content = fs.readFileSync(path.resolve(__dirname, 'input.docx'), 'binary');
	
	var zip = new JSZip(content);

	var doc = new Docxtemplater();
	doc.loadZip(zip);
	
	doc.setData({
		doc_date_d: parseDate(readyObj.docDate).day,
		doc_date_m: getMonth(parseDate(readyObj.docDate).month),
		doc_date_y: parseDate(readyObj.docDate).year,
		doc_town: readyObj.docTown,
		consumer_name: readyObj.consumerName,
		consumer_address: readyObj.consumerAddress,
		contract_num : readyObj.contractNum,
		contract_date : readyObj.contractDate,
		tso_rank: readyObj.tsoRank,
		tso_fio: readyObj.tsoFio,
		agent_rank: readyObj.agentRank,
		agent_fio: readyObj.agentFio,
		consumer_rank: readyObj.consumerRank,
		consumer_fio: readyObj.consumerFio,
		survey_date_d: parseDate(readyObj.surveyDate).day,
		survey_date_m: getMonth(parseDate(readyObj.surveyDate).month),
		survey_date_y: parseDate(readyObj.surveyDate).year,
		object_address: readyObj.objectAddress,
		object_note: readyObj.objectNote,
		p1: readyObj.p1,
		p2: readyObj.p2,
		p3_a: formatOptions(['есть','нет'], readyObj.p3_a, [], '', ' / ', true),
		p3_b: formatOptions(['есть','нет'], readyObj.p3_b, [], '', ' / ', true),
		p3_c: formatOptions(['есть','нет'], readyObj.p3_c, [], '', ' / ', true),
		p4: formatOptions(['1','2','3','4','5','6','7','8','9'], readyObj.p4, [], '', '     ', true),
		p5: formatOptions(['1','2','3','4','5','6','7','8','9'], readyObj.p5, [], '', '     ', true),
		p6: formatOptions(['150/70','130/70','115/70','95/70'], readyObj.p6, [], '', ' , ', true),
		p7: formatOptions(['предоставлен','не предоставлен'], readyObj.p7, [], '', ' / ', true),
		p8: formatOptions(['соответствуют','не соответствуют'], readyObj.p8, [], '', ' / ', true),
		p9: formatOptions(['в наличии','отсутствует'], readyObj.p9, [], '', ' / ', true),
		p10: formatOptions(['в наличии','отсутствует'], readyObj.p10, [], '', ' / ', true),
		p11: formatOptions(['производилась','не производилась'], readyObj.p11, [], '', ' / ', true),
		wash_date_d: parseDate(readyObj.washDate).day,
		wash_date_m: getMonth(parseDate(readyObj.washDate).month),
		wash_date_y: parseDate(readyObj.washDate).year,
		p11_water: formatOptions(['холодной водой','горячей водой'], readyObj.p11_water, [], '', ' / ', true),
		p12: formatOptions(['производилась','не производилась','не требуется'], readyObj.p12, [], '', ' / ', true),
		p13_a: formatOptions(['производились','не производились'], readyObj.p13_a, [], '', ' / ', true),
		p13_a_date_d: parseDate(readyObj.p13_a_date).day,
		p13_a_date_m: getMonth(parseDate(readyObj.p13_a_date).month),
		p13_a_date_y: parseDate(readyObj.p13_a_date).year,
		p13_b: formatOptions(['производились','не производились','не требуется'], readyObj.p13_b, [], '', ' / ', true),
		p13_b_date_d: parseDate(readyObj.p13_b_date).day,
		p13_b_date_m: getMonth(parseDate(readyObj.p13_b_date).month),
		p13_b_date_y: parseDate(readyObj.p13_b_date).year,
		p13_c: formatOptions(['производились','не производились','нет на балансе'], readyObj.p13_c, [], '', ' / ', true),
		p14_a: readyObj.p14_a,
		p14_a1: formatOptions(['в наличии','отсутствует'], readyObj.p14_a1, [], '', ' / ', true),
		p14_a2: formatOptions(['опломбирован','не опломбирован'], readyObj.p14_a2, [], ',       ', ' / ', true),
		p14_a3: readyObj.p14_a3,
		p14_b1: formatOptions(['в наличии','отсутствует'], readyObj.p14_b1, [], '', ' / ', true),
		p14_b2: formatOptions(['опломбирован','не опломбирован'], readyObj.p14_b2, [], ',       ', ' / ', true),
		p14_b3: readyObj.p14_b3,
		p14_c1: formatOptions(['в наличии','отсутствует'], readyObj.p14_c1, [], '', ' / ', true),
		p14_c2: formatOptions(['опломбирован','не опломбирован'], readyObj.p14_c2, [], ',       ', ' / ', true),
		p14_c3: readyObj.p14_c3,
		p15_a: formatOptions(['есть','нет'], readyObj.p15_a, ['<w:jc w:val="center"/>'], '', ' / ', true),
		p15_a_d: readyObj.p15_a_d,
		p15_b: formatOptions(['есть','нет'], readyObj.p15_b, ['<w:jc w:val="center"/>'], '', ' / ', true),
		p15_b_d: readyObj.p15_b_d,
		p15_c: formatOptions(['есть','нет'], readyObj.p15_c, ['<w:jc w:val="center"/>'], '', ' / ', true),
		p15_c_d: readyObj.p15_c_d,
		p15_d: formatOptions(['есть','нет'], readyObj.p15_d, ['<w:jc w:val="center"/>'], '', ' / ', true),
		p15_d_d: readyObj.p15_d_d,
		p16_a: formatOptions(['есть','нет'], readyObj.p16_a, [], '', ' / ', true),
		p16_a1: formatOptions(['в наличии','отсутствует'], readyObj.p16_a1, [], '', ' / ', true),
		p16_a2: formatOptions(['в наличии','отсутствует'], readyObj.p16_a2, [], '', ' / ', true),
		p16_a3: formatOptions(['в наличии','отсутствует'], readyObj.p16_a3, [], '', ' / ', true),
		p16_b: formatOptions(['есть','нет'], readyObj.p16_b, [], '', ' / ', true),
		p16_c: formatOptions(['предоставлен','не предоставлен'], readyObj.p16_c, [], '', ' / ', true),
		p16_gk: readyObj.p16_gk + ' Гкал',
		p16_m3: readyObj.p16_m3 + ' м3',
		p17_a: formatOptions(['есть','нет','частично'], readyObj.p17_a, [], '', ' / ', true),
		p17_b: formatOptions(['есть','нет','частично'], readyObj.p17_b, [], '', ' / ', true),
		p17_c: formatOptions(['есть','нет','частично'], readyObj.p17_c, [], '', ' / ', true),
		p18_a: formatOptions(['есть','нет'], readyObj.p18_a, [], '', ' / ', true),
		p18_a1: formatOptions(['удовл.','не удовл.'], readyObj.p18_a1, [], '', ' / ', true),
		p18_b: formatOptions(['есть','нет'], readyObj.p18_b, [], '', ' / ', true),
		p18_b1: formatOptions(['удовл.','не удовл.'], readyObj.p18_b1, [], '', ' / ', true),
		p18_c: formatOptions(['есть','нет'], readyObj.p18_c, [], '', ' / ', true),
		p18_c1: formatOptions(['удовл.','не удовл.'], readyObj.p18_c1, [], '', ' / ', true),
		p19_a: formatOptions(['удовл.','не удовл.'], readyObj.p19_a, [], '', ' / ', true),
		p19_b: formatOptions(['удовл.','не удовл.'], readyObj.p19_b, [], '', ' / ', true),
		p20: readyObj.p20,
		p21_1: formatOptions(['  1. Восстановить изоляцию трубопроводов в индивидуальном тепловом пункте (ИТП).'], readyObj.p21_1, [], '', '', false),
		p21_2: formatOptions(['  2. Оформить паспорт теплопотребляющей установки с размещением его в ИТП.'], readyObj.p21_2, [], '', '', false),
		p21_3: formatOptions(['  3. Оформить и вывесить в помещении ИТП принципиальную схему теплопотребляющей установки и инструкцию для обслуживающего персонала.'], readyObj.p21_3, [], '', '', false),
		p21_4: formatOptions(['  4. Обеспечить наличие КИП давления и температуры теплоносителя в контрольных точках измерения.'], readyObj.p21_4, [], '', '', false),
		p21_5: formatOptions(['  5. Произвести ревизию запорной арматуры в системе теплопотребления.'], readyObj.p21_5, [], '', '', false),
		p21_6: formatOptions(['  6. Обеспечить маркировку оборудования ИТП согласно схеме.'], readyObj.p21_6, [], '', '', false),
		p21_7: formatOptions(['  7. Другое (при наличии других замечаний, указать дополнительно):'], readyObj.p21_7, [], '', '', false),
		p21_71: formatOptions(['  7.1 Предоставить проект на систему теплопотребления.'], readyObj.p21_71, [], '', '', false),
		p21_72: formatOptions(['  7.2 Восстановить тепловую изоляцию на трубопроводах внутридомовых систем отопления, вентиляции и горячего водоснабжения.'], readyObj.p21_72, [], '', '', false),
		p21_73: formatOptions(['  7.3 На подающем и обратном трубопроводе обеспечить устройства для механической очистки от взвешенных частиц.'], readyObj.p21_73, [], '', '', false),
		p21_74: formatOptions(['  7.4 Обеспечить на вводах трубопроводах тепловых сетей в здания устройств, предотвращающих проникновение сетевой воды в здания, ИТП (заделать ниши каналов на вводах трубопроводов в здания)'], readyObj.p21_74, [], '', '', false),
		p21_8: formatOptions(['  8. В соответствии со статьей 13 указанного Федерального закона Вы обязаны в срок до 1 января 2019 года обеспечить установку и ввод в эксплуатацию общедомового прибора учета тепловой энергии, ГВС.'], readyObj.p21_8, [], '', '', false),
		p21_add: readyObj.p21_add,
		p22_date_d: parseDate(readyObj.p22_date).day,
		p22_date_m: getMonth(parseDate(readyObj.p22_date).month),
		p22_date_y: parseDate(readyObj.p22_date).year
	});
	
	try {
		// render the document (replace all occurences of {first_name} by John, {last_name} by Doe, ...)
		doc.render()
	}
	catch (error) {
		
		var e = {
			message: error.message,
			name: error.name,
			stack: error.stack,
			properties: error.properties,
		}
		console.log(JSON.stringify({error: e}));
		// The error thrown here contains additional information when logged with JSON.stringify (it contains a property object).
		throw error;
		
		/*
		error.properties.errors.forEach(function(err) {
			console.log(err);
		});
		*/
	}
	
	var buf = doc.getZip().generate({type: 'nodebuffer'});

	// buf is a nodejs buffer, you can either write it to a file or do anything else with it.
	//fs.writeFileSync(path.resolve(__dirname, 'output.docx'), buf);
	res.writeHead(200, {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'Content-disposition': 'attachment;filename="' + 'output' + '.docx"',
        'Content-Length': buf.length
    });
	res.end(new Buffer(buf, 'binary'));
});

module.exports = docxRouter;
