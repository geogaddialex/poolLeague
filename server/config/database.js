module.exports = function( mongoose ){

	if(process.env.NODE_ENV == "production"){

		mongoose.connect('mongodb://admin:th3p455w0rd15@ds263848.mlab.com:63848/pool');

	}else{

		mongoose.connect('mongodb://admin:th3p455w0rd15@ds151586.mlab.com:51586/pooldev');
	
	}
}