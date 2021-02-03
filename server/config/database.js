module.exports = function( mongoose ){

	if(process.env.NODE_ENV == "production"){

		mongoose.connect('mongodb+srv://admin:th3p455w0rd15@poolleagueprod.jwboi.mongodb.net/prod?retryWrites=true&w=majority');

	}else{

		mongoose.connect('mongodb+srv://admin:th3p455w0rd15@poolleaguedev.1empn.mongodb.net/dev?retryWrites=true&w=majority');
	
	}
}