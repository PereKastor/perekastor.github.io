function Tronc(ligne,x){
  var posX, posY, image, l, vit, larg;
	var pathImg = "./images/";
	if(ligne == 1){
		posX = x;
		posY = 340;
		image = new Image();
		image.src = pathImg + "Tronc1.png";
		l = ligne;
		vit = 1;
		larg = 177;
	}else if(ligne == 2){
		posX = x;
		posY = 311;
		image = new Image();
		image.src = pathImg + "Tronc3.png";
		l = ligne;
		vit = 1.3;
		larg = 84;
	}else if(ligne == 3){
		posX = x;
		posY = 282;
		image = new Image();
		image.src = pathImg + "Tronc2.png";
		l = ligne;
		vit = 0.7;
		larg = 116;
	}else if(ligne == 4){
		posX = x;
		posY = 253;
		image = new Image();
		image.src = pathImg + "Tronc1.png";
		l = ligne;
		vit = 0.9;
		larg = 177;
	}else if(ligne == 5){
		posX = x;
		posY = 224;
		image = new Image();
		image.src = pathImg + "Tronc2.png";
		l = ligne;
		vit = 1;
		larg = 116;
	}
	
	Object.defineProperties(this, {
		posX: {
			get: function() { 
				return posX; }, 
			set: function(newValue) {
				posX = newValue;}},
		posY: {
			get: function() { 
				return posY; }, 
			set: function(newValue) {
				posY = newValue;}},
		image: {
			get: function() { 
				return image; }, 
			set: function(newValue) {
				image = newValue;}},
		l: {
			get: function() { 
				return l; }, 
			set: function(newValue) {
				l = newValue;}},
		vit: {
			get: function() {
				return vit;	},
			set: function(newValue) {
				vit = newValue;}},
		larg: {
			get: function() {
				return larg;	},
			set: function(newValue) {
				larg = newValue;}}				
	});
}

Tronc.prototype.bouger = function(){
	if(this.l == 1){//Buches de la ligne 1
		if(this.posX >= (-177))
			this.posX -= this.vit;
		else
			this.posX = 500;
	}else if(this.l == 2){//Buches de la ligne 2
		if(this.posX <= 400)
			this.posX += this.vit;
		else
			this.posX = -150;
	}else if(this.l == 3 || this.l == 5){//Buches de la ligne 3 ou 5
		if(this.posX >= (-116))
			this.posX -= this.vit;
		else
			this.posX = 450;
	}else if(this.l == 4){//Buches de la ligne 4
		if(this.posX <= 400)
			this.posX += this.vit;
		else
			this.posX = -200;
	}
};

Tronc.prototype.draw = function(context){
	context.drawImage(this.image,this.posX,this.posY);
};
