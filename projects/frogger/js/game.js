var HP = 450;//Hauteur du plateau
var WP = 400;//Largeur du plateau
var time = 60;
var count = 0;
var win_frog = new Array(0,0,0,0,0);
var pathImg = "./images/";

//Création des troncs
var tronc1_1 = new Tronc(1,500);
var tronc1_2 = new Tronc(1,800);
var tronc2_1 = new Tronc(2,(-200));
var tronc2_2 = new Tronc(2,(-400));
var tronc2_3 = new Tronc(2,(-550));
var tronc3_1 = new Tronc(3,475);
var tronc3_2 = new Tronc(3,725);
var tronc4_1 = new Tronc(4,(-200));
var tronc4_2 = new Tronc(4,(-500));
var tronc5_1 = new Tronc(5,475);
var tronc5_2 = new Tronc(5,725);

//Création des voitures ainsi que leurs vitesses
var vit1 = 0.5 + Math.random()*(1.5 - 0.5);
var voiture1_1 = new Voitures(1,(-50),vit1);
var voiture1_2 = new Voitures(1,(-240),vit1);
var vit2 = 0.5 + Math.random()*(1.5 - 0.5);
var voiture2_1 = new Voitures(2,450,vit2);
var voiture2_2 = new Voitures(2,650,vit2);
var voiture2_3 = new Voitures(2,800,vit2);
var vit3 = 0.5 + Math.random()*(1.5 - 0.5);
var voiture3_1 = new Voitures(3,(-90),vit3);
var voiture3_2 = new Voitures(3,(-260),vit3);
var vit4 = 0.5 + Math.random()*(1.5 - 0.5);
var voiture4_1 = new Voitures(4,475,vit4);
var voiture4_2 = new Voitures(4,700,vit4);
var vit5 = 0.5 + Math.random()*(1.5 - 0.5);
var voiture5_1 = new Voitures(5,(-70),vit5);
var voiture5_2 = new Voitures(5,(-250),vit5);
var voiture5_3 = new Voitures(5,(-350),vit5);

//Création de la grenouille
var frog = new Frog();

//Création des images
var img_haut = new Image();
img_haut.src = pathImg + 'Haut.png';
var img_bas = new Image();
img_bas.src = pathImg + 'Bas.png';
var img_middle = new Image();
img_middle.src = pathImg + 'Middle.png';
var frog_score = new Image();
frog_score.src = pathImg + "Frog5.png";
var frog_win = new Image();
frog_win.src = pathImg + "Frog7.png";

window.onload = function () {	
	
	interval = setInterval(game, 10);
	
	window.document.onkeydown = move;	
};


function move(e){
	if(frog.move){
		if (e.keyCode == 39){ // Flêche de droite préssée
			frog.bouger(3);
		}else if (e.keyCode == 37){ // Flêche de gauche préssée
			frog.bouger(4);
		}
		
		if (e.keyCode == 38){ // Flêche de haut préssée
			frog.bouger(1);
		}else if (e.keyCode == 40){ // Flêche de bas préssée
			frog.bouger(2);
		}	
	}
}

function game(context){
	var box = document.getElementById('canvasBox');
	var context = box.getContext('2d');

	context.clearRect(0,0,WP,HP);
	
	context.fillStyle = "black";
	context.fillRect(0,0,WP,HP); //Fond noir
	
	context.fillStyle = "blue";
	context.fillRect(0,195,WP,180);//Rivière
	
	context.drawImage(img_haut,0,-6,WP,56);
	context.drawImage(img_middle,0,192,WP,25);
	context.drawImage(img_bas,0,364,WP,30);
	
	//Affichage des troncs
	afficheBuche(context);
	
	//Affichage des voitures
	afficheVoiture(context);
	
	//Gestion des déplacements sur les troncs
	if(!frog.dead)
		checkWood();
	
	//Gestion des plateformes au milieu
	if(!frog.dead)
		if(frog.ligne == 6)
			if((frog.posX < 10 || frog.posX > 24) && (frog.posX < 92 || frog.posX > 110) && (frog.posX < 175 || frog.posX > 191) && (frog.posX < 260 || frog.posX > 279) && (frog.posX < 347 || frog.posX > 358))
				frog.die();
	
	//Gestion des collisions avec les voitures
	if(!frog.dead)
		checkColli();
		
	//Gestion de la ligne d'arrivée
	if(!frog.dead)
		checkNenu();
		
	afficheGrenouilleWin(context);	
	
	
	//Gestion du score et du temps
	for(var j = 0; j < frog.life; j++){
		var x = (j+1) * 15 - 5;
		context.drawImage(frog_score,x,395,10,10);
	}
	context.font = "20px Calibri";
	context.fillStyle = "white";
	context.fillText('Score : '+frog.score,5,430);
	context.fillText('Time : '+time,300,430);
	if(!frog.fini){
		count++;
		if(count == 100){
			time--;
			count = 0;
		}
		
		if(time <= 0){
			frog.die();
		}
	}
	if(frog.dead){
		time = 60;
		if(frog.life > 0){
			context.font = "40px Calibri";
			context.fillText('Try again',130,140);
		}else{
			context.font = "40px Calibri";
			context.fillText('You LOSE !',120,140);
			for(var k = 0; k < 5; k++)
				win_frog[k] = 0;
		}
	}else
		frog.draw(context);
		
	if(frog.fini){
		context.font = "40px Calibri";
		context.fillText('You WIN !',130,140);
		frog.move = false;
	}
}

function checkNenu(){
	/*
	 * Ici on regarde si la grenouille est dans les cases en haut de la carte pour la faire gagner.
	 * Si la case est deja prise, la grenouille meurt.
	 */
	if(frog.ligne == 12){
		if(frog.posX >= 5 && frog.posX <= 35 && !win_frog[0]){
			win_frog[0] = 1;
			frog.win();
			time = 60;
		}else if(frog.posX >= 90 && frog.posX <= 110 && !win_frog[1]){
			win_frog[1] = 1;
			frog.win();
			time = 60;
		}else if(frog.posX >= 165 && frog.posX <= 195 && !win_frog[2]){
			win_frog[2] = 1;
			frog.win();
			time = 60;
		}else if(frog.posX >= 260 && frog.posX <= 290 && !win_frog[3]){
			win_frog[3] = 1;
			frog.win();
			time = 60;
		}else if(frog.posX >= 340 && frog.posX <= 370 && !win_frog[4]){
			win_frog[4] = 1;
			frog.win();
			time = 60;
		}else
			frog.die();
	}
}

function checkColli(){
	/*
	 * On regarde sur chaque ligne les collisions possible avec les voitures.
	 * On prends en considération la taille de la grenouille.
	 */
	if(frog.ligne > 6 && frog.ligne < 12){
		if(frog.ligne == 7){
			if((frog.posX + frog.larg) >= voiture1_1.posX && frog.posX <= (voiture1_1.posX + voiture1_1.larg))
				frog.die();
			else if((frog.posX + frog.larg) >= voiture1_2.posX && frog.posX <= (voiture1_2.posX + voiture1_2.larg))
				frog.die();
		}else if(frog.ligne == 8){
			if((frog.posX + frog.larg) >= voiture2_1.posX && frog.posX <= (voiture2_1.posX + voiture2_1.larg))
				frog.die();
			else if((frog.posX + frog.larg) >= voiture2_2.posX && frog.posX <= (voiture2_2.posX + voiture2_2.larg))
				frog.die();
			else if((frog.posX + frog.larg) >= voiture2_3.posX && frog.posX <= (voiture2_3.posX + voiture2_3.larg))
				frog.die();
		}else if(frog.ligne == 9){
			if((frog.posX + frog.larg) >= voiture3_1.posX && frog.posX <= (voiture3_1.posX + voiture3_1.larg))
				frog.die();
			else if((frog.posX + frog.larg) >= voiture3_2.posX && frog.posX <= (voiture3_2.posX + voiture3_2.larg))
				frog.die();
		}else if(frog.ligne == 10){
			if((frog.posX + frog.larg) >= voiture4_1.posX && frog.posX <= (voiture4_1.posX + voiture4_1.larg))
				frog.die();
			else if((frog.posX + frog.larg) >= voiture4_2.posX && frog.posX <= (voiture4_2.posX + voiture4_2.larg))
				frog.die();
		}else if(frog.ligne == 11){
			if((frog.posX + frog.larg) >= voiture5_1.posX && frog.posX <= (voiture5_1.posX + voiture5_1.larg))
				frog.die();
			else if((frog.posX + frog.larg) >= voiture5_2.posX && frog.posX <= (voiture5_2.posX + voiture5_2.larg))
				frog.die();
			else if((frog.posX + frog.larg) >= voiture5_3.posX && frog.posX <= (voiture5_3.posX + voiture5_3.larg))
				frog.die();
		}
	}
}

function checkWood(){
	/*
	 * Ici on regarde si la grenouille est positionnée sur notre tronc, si oui, on effectue la fonction en donnant la vitesse du tronc.
	 */
	if(frog.ligne > 0 && frog.ligne < 6){
		if(frog.ligne == 1){
			if(frog.posX >= tronc1_1.posX && frog.posX <= (tronc1_1.posX + tronc1_1.larg - frog.larg))
				frog.onWood(tronc1_1.vit);
			else if(frog.posX >= tronc1_2.posX && frog.posX <= (tronc1_2.posX + tronc1_2.larg - frog.larg))
				frog.onWood(tronc1_2.vit);
			else
				frog.die();
				
			if(frog.posX <= 0)
				frog.die();
		}else if(frog.ligne == 2){
			if(frog.posX >= tronc2_1.posX && frog.posX <= (tronc2_1.posX + tronc2_1.larg - frog.larg))
				frog.onWood(tronc2_1.vit);
			else if(frog.posX >= tronc2_2.posX && frog.posX <= (tronc2_2.posX + tronc2_2.larg - frog.larg))
				frog.onWood(tronc2_2.vit);
			else if(frog.posX >= tronc2_3.posX && frog.posX <= (tronc2_3.posX + tronc2_3.larg - frog.larg))
				frog.onWood(tronc2_3.vit);
			else
				frog.die();
				
			if((frog.posX + frog.larg) >= 400)
				frog.die();
		}else if(frog.ligne == 3){
			if(frog.posX >= tronc3_1.posX && frog.posX <= (tronc3_1.posX + tronc3_1.larg - frog.larg))
				frog.onWood(tronc3_1.vit);
			else if(frog.posX >= tronc3_2.posX && frog.posX <= (tronc3_2.posX + tronc3_2.larg - frog.larg))
				frog.onWood(tronc3_2.vit);
			else
				frog.die();
				
			if(frog.posX <= 0)
				frog.die();
		}else if(frog.ligne == 4){
			if(frog.posX >= tronc4_1.posX && frog.posX <= (tronc4_1.posX + tronc4_1.larg - frog.larg))
				frog.onWood(tronc4_1.vit);
			else if(frog.posX >= tronc4_2.posX && frog.posX <= (tronc4_2.posX + tronc4_2.larg - frog.larg))
				frog.onWood(tronc4_2.vit);
			else
				frog.die();
				
			if((frog.posX + frog.larg) >= 400)
				frog.die();
		}else if(frog.ligne == 5){
			if(frog.posX >= tronc5_1.posX && frog.posX <= (tronc5_1.posX + tronc5_1.larg - frog.larg))
				frog.onWood(tronc5_1.vit);
			else if(frog.posX >= tronc5_2.posX && frog.posX <= (tronc5_2.posX + tronc5_2.larg - frog.larg))
				frog.onWood(tronc5_2.vit);
			else
				frog.die();
				
			if(frog.posX <= 0)
				frog.die();
		}
	}
}

function afficheGrenouilleWin(context){
	/*
	 * Cette fonctionne affiche les grenouille en haut de l'écran une fois que nous sommes arrivés dans une des cases.
	 * Ce système fonctionne grace à un tableau.
	 */
	var check = 0;
	
	for(var i = 0; i < win_frog.length; i++){
		if(win_frog[i]){
			check++;
			if(i == 0)
				context.drawImage(frog_win,15,20);
			else if(i == 1)
				context.drawImage(frog_win,100,20);
			else if(i == 2)
				context.drawImage(frog_win,185,20);
			else if(i == 3)
				context.drawImage(frog_win,270,20);
			else if(i == 4)
				context.drawImage(frog_win,355,20);
		}else
			check = 0;
	}
	
	if(check == 5)
		frog.fini = true;
	
}

function afficheVoiture(context){
	//Première ligne de voiture
	voiture1_1.draw(context);
	voiture1_2.draw(context);
	voiture1_1.bouger();
	voiture1_2.bouger();
	
	//Deuxième ligne de voiture
	voiture2_1.draw(context);
	voiture2_2.draw(context);
	voiture2_3.draw(context);
	voiture2_1.bouger();
	voiture2_2.bouger();
	voiture2_3.bouger();
	
	//Troisième ligne de voiture
	voiture3_1.draw(context);
	voiture3_2.draw(context);
	voiture3_1.bouger();
	voiture3_2.bouger();
	
	//Quatrième ligne de voiture
	voiture4_1.draw(context);
	voiture4_2.draw(context);
	voiture4_1.bouger();
	voiture4_2.bouger();
	
	//Cinquième ligne de voiture
	voiture5_1.draw(context);
	voiture5_2.draw(context);
	voiture5_3.draw(context);
	voiture5_1.bouger();
	voiture5_2.bouger();
	voiture5_3.bouger();
}

function afficheBuche(context){
	//Première ligne de buche
	tronc1_1.draw(context);
	tronc1_2.draw(context);
	tronc1_1.bouger();
	tronc1_2.bouger();
	
	//Deuxième ligne de buche
	tronc2_1.draw(context);
	tronc2_2.draw(context);
	tronc2_3.draw(context);
	tronc2_1.bouger();
	tronc2_2.bouger();
	tronc2_3.bouger();
	
	//Troisième ligne de buche
	tronc3_1.draw(context);
	tronc3_2.draw(context);
	tronc3_1.bouger();
	tronc3_2.bouger();
	
	//Quatrième ligne de buche
	tronc4_1.draw(context);
	tronc4_2.draw(context);
	tronc4_1.bouger();
	tronc4_2.bouger();
	
	//Cinquième ligne de buche
	tronc5_1.draw(context);
	tronc5_2.draw(context);
	tronc5_1.bouger();
	tronc5_2.bouger();
}
