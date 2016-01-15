function Frog(){
	var posX = 400 / 2 - 15;
	var posY = 370;
	var sautA = 29;//Saut Avant/Arrière
	var sautC = 28;//Saut de Coté
	var image = new Image();
	var ligne = 0;
	var life = 3;
	var larg = 23;
	var dead = false;
	var fini = false;
	var move = true;
	var score = 0;
	var max_l = 0;
	image.src = "./images/Frog5.png";
	
	//Déclaration de tous les getter et setter
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
		sautA: {
			get: function() { 
				return sautA; }, 
			set: function(newValue) {
				sautA = newValue;}},
		sautC: {
			get: function() {
				return sautC;	},
			set: function(newValue) {
				sautC = newValue;}},
		ligne: {
			get: function() {
				return ligne;	},
			set: function(newValue) {
				ligne = newValue;}},
		life: {
			get: function() {
				return life;	},
			set: function(newValue) {
				life = newValue;}},			
		larg: {
			get: function() {
				return larg;	},
			set: function(newValue) {
				larg = newValue;}},		
		dead: {
			get: function() {
				return dead;	},
			set: function(newValue) {
				dead = newValue;}},
		fini: {
			get: function() {
				return fini;	},
			set: function(newValue) {
				fini = newValue;}},
		move: {
			get: function() {
				return move;	},
			set: function(newValue) {
				move = newValue;}},			
		score: {
			get: function() {
				return score;	},
			set: function(newValue) {
				score = newValue;}},			
		max_l: {
			get: function() {
				return max_l;	},
			set: function(newValue) {
				max_l = newValue;}}			
	});
}

Frog.prototype.bouger = function(val){
	if(val == 1){//Déplacement de la grenouille vers le haut
		if((this.posY - this.sautA) >= 0){
			var y = this.posY;
			for(var i = 0; i < this.sautA; i++)
				this.posY--;
				
			if(this.posY == (y - this.sautA))
				this.image.src = "./images/Frog5.png";
				
			this.larg = 23;
			this.ligne++;
			if(this.max_l < this.ligne){
				this.max_l++;
				this.score += 10;
			}	
		}else
			this.image.src = "./images/Frog5.png";
	}else if(val == 2){//Déplacement de la grenouille vers le bas
		if((this.posY + this.sautA + 60) <= 450){
			var y = this.posY;
			for(var i = 0; i < this.sautA; i++)
				this.posY++;
				
			if(this.posY == (y + this.sautA))
				this.image.src = "./images/Frog7.png";
				
			this.larg = 23;	
			this.ligne--;
		}else
			this.image.src = "./images/Frog7.png";
	}else if(val == 3){//Déplacement de la grenouille vers la droite
		if((this.posX + this.sautC + 23) <= 400){
			var x = this.posX;
			for(var i = 0; i < this.sautC; i++)
				this.posX++;
				
			if(this.posX == (x + this.sautC))
				this.image.src = "./images/Frog1.png";
				
			this.larg = 17;			
		}else
			this.image.src = "./images/Frog1.png";
	}else if(val == 4){//Déplacement de la grenouille vers la gauche
		if((this.posX - this.sautC) >= 0){
			var x = this.posX;
			for(var i = 0; i < this.sautC; i++)
				this.posX--;
				
			if(this.posX == (x - this.sautC))
				this.image.src = "./images/Frog3.png";
				
			this.larg = 19;
		}else
			this.image.src = "./images/Frog3.png";
	}
};

Frog.prototype.draw = function(context){
	context.drawImage(this.image,this.posX,this.posY);
};

Frog.prototype.die = function(){
	this.dead = true;
	this.move = false;
	if(this.life > 0){
		setTimeout(function(){
			frog.restart();
		},2000);	
	}else{
		setTimeout(function(){
			frog.restartGame();
		},5000);
	}
};

Frog.prototype.win = function(){
	this.posX = 400 / 2 - 15;
	this.posY = 370;
	this.ligne = 0;
	this.image.src = "./images/Frog5.png";
	this.score += 200;
};

Frog.prototype.restart = function(){
	this.posX = 400 / 2 - 15;
	this.posY = 370;
	this.ligne = 0;
	this.max_l = 0;
	this.life--;
	this.move = true;
	this.image.src = "./images/Frog5.png";
	this.dead = false;
};

Frog.prototype.restartGame = function(){
	this.posX = 400 / 2 - 15;
	this.posY = 370;
	this.ligne = 0;
	this.life = 3;
	this.move = true;
	this.score = 0;
	this.image.src = "./images/Frog5.png";
	this.dead = false;
};

Frog.prototype.onWood = function(vit){
	if(this.ligne == 2 || this.ligne == 4)
		this.posX += vit;
	else
		this.posX -= vit;
};
