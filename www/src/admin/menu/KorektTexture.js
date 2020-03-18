
function KorektTexture (par,cont, _x, _y, _fun) {
	var self = this;
	korektM = this;
	this.par=par
	this.type = 'KorektTexture';
	this.content = new DCont();
	cont.add(this.content);

	this.fun=_fun;
	this._x = _x || 0;
	this._y = _y || 0;

	this.content.x = this._x;
	this.content.y = this._y;

	const aGlafMenu = this.par.par.par; // aGlaf.menu not initet yet

	this.otstup = 2;
	this._width = 200;
	this._height = 100;
	this.arrTBName= ['map','alphaMap','bumpMap','normalMap','displacementMap','roughnessMap','metalnessMap','lightMap','aoMap','emissiveMap']
	this.arrblok=[]

	this.sob=function(s,p){
		if(s=="changes"){
			self.drahH()			
		}
		if(s=="creatTextur"){
			self.drahH()			
			self.material[this.name] = this.textur;
			self.material.needsUpdate=true;			
		}

		console.warn("s======================"+s)
		self.save()
		
	}
	this.panel=new DPanel(this.content,0,0)
	this.panel.width=this._width 
	for (var i = 0; i < this.arrTBName.length; i++) {
		this.arrblok[i]=new TexturBlok(this, this.arrTBName[i], i, this.sob)
	}


		
	this.clear=function(){
		for (var i = 0; i < this.arrblok.length; i++) {
			this.arrblok[i].clear()
		}
	}


	this.drahH=function(){
		var seh=this.otstup;
		for (var i = 0; i < this.arrblok.length; i++) {
			if(this.arrblok[i].visible==true){
				this.arrblok[i].dCont.y=seh;
				seh+=this.otstup+this.arrblok[i].height;
			}
		}
		this.panel.height=seh
	}
	var t
	self.save=function(){
		var a=[];
		for (var i = 0; i < this.arrblok.length; i++) {
			if(this.arrblok[i].visible==true){
				if(this.arrblok[i].active==true){
					if(this.arrblok[i].textur!=null){
						if (this.arrblok[i].objDin) {
							a.push({
								id: this.arrblok[i].objDin.id,
								name: this.arrblok[i].name
							});
						} else {
							var s = this.arrblok[i].image.link;
							var aa = s.split("resources")
							var ss = "resources" + aa[1];
							var aa = s.split("/")
							var ss1 = aa[aa.length - 1];


							a.push({
								link: ss,
								l: ss1,
								name: this.arrblok[i].name,
								rx: this.arrblok[i].textur.repeat.x,
								ry: this.arrblok[i].textur.repeat.y
							})
						}
					}
				}
			}
		}
		
		this.par.objGlaf.textur=a;
		this.par.par.saveTime()
		
	}

	self.setObj=function(a){
		if(a!=undefined){
			for (var i = 0; i < a.length; i++) {
				for (var j = 0; j < this.arrblok.length; j++) {
					if(a[i].name==this.arrblok[j].name){
						if (a[i].id) {
							const objDin = aGlafMenu.textureBD.find(a[i].id);
							objDin && this.arrblok[j].setTextureFromBD(objDin, true);
						} else {
							this.arrblok[j].setPicLoad(a[i].link, true);
							this.arrblok[j].textur.repeat.x = a[i].rx;
							this.arrblok[j].textur.repeat.y = a[i].ry;
						}
					}
				}
				
			}
		}
	}



	this.material=undefined;
	this.arr=undefined;
	this.setVisiMat=function(m, arr){
		this.testTextur(m, arr);
		this.material=m;
		this.arr=arr;	
		
			
		for (var i = 0; i < this.arrblok.length; i++) {
			this.arrblok[i].visible=false;
		}
		for (var i = 0; i < arr.length; i++) {
			for (var j = 0; j < this.arrblok.length; j++) {				
				if(arr[i].type==this.arrblok[j].name){
					this.arrblok[j].visible=true;					
				}
			}
		}
		for (var i = 0; i < this.arrblok.length; i++) {
			if(this.arrblok[i].visible==true){				
				this.arrblok[i].setTextur(this.material[this.arrblok[i].name]);				
			}
		}
		this.drahH();
	}

	this.testTextur=function(m,arr){
		var b=false;
		for (var i = 0; i < arr.length; i++) {
			for (var j = 0; j < this.arrblok.length; j++) {				
				if(arr[i].type==this.arrblok[j].name){
					if(this.arrblok[j].textur!=null){
						m[this.arrblok[j].name]=this.arrblok[j].textur;
						b=true;
					}
				}
			}	
		}
		if(b==true){
			//this.sob("save");
			if(self.material)self.material.needsUpdate=true;	
		}
	}

}

KorektTexture.prototype = {
	

	set width (v) {
		if (this._width == v) return;
		this._width = v;
		this.draw();
	},
	get width () {
		return this._width;
	},
	set height (v) {
		if (this._height == v) return;
		this._height = v;
		
	},
	get height () {
		return this._height;
	},



};


function TexturBlok (par, name, idArr, _fun) {
	var self = this;
	korektM = this;
	this.type = 'TexturBlok';
	this.idArr=idArr
	
	this.par=par;
	this.name=name;
	this.fun=_fun;

	this.objDin = null;

	this.dCont=new DCont(this.par.content) 

	const aGlafMenu = this.par.par.par.par; // aGlaf.menu not initet yet




	this.otstup = 2;
	this._width = par._width;
	this._height = 32;
	this.textur=undefined;
	this._wh = 64;

	this._active=false

/*
	this._minimize = false; // спрятать низ или открыть по ум открыто	
	    this._hasMinimizeButton = false; // кнопочка для спрятать
	    this._dragBool = true;	
	    this._activMouse = true; 	

*/
	


	this.window=new DWindow(null,this.otstup,0,this.name);
	this.window.hasMinimizeButton=false;
	this.window.dragBool=false;
	this.window.minimize=true;
	this.window.width=this._width-this.otstup*2;
	this.window.height = 32;

	this.button=new DButton(this.window,this.otstup,this.otstup,"load",function(b){		
		//self.image.link=b;
		

		self.setPic(this.files[0])
		
		
	});
	this.button.width=55;
	this.button.x=this.window.width-this.button.width-this.otstup;
	this.button.height=	this._height-this.otstup*2;
	this.button.startFile();

	this.buttonX=new DButton(this.window,this.otstup,this.otstup,"x",function(b){
		self.setDisplayMod(null);
		self.clear();
		self.fun("creatTextur");
	});	
	this.buttonX.width=this.buttonX.height=	this._height-this.otstup*2;
	this.buttonX.x=this.window.width-this.buttonX.width-this.otstup;
	this.buttonX.visible=this._active

	this.dCont1=new DCont(this.window) 
	this.dCont1.visible=this._active;
	this.dCont1.y=this._height;

	this.panel=new DPanel(this.dCont1,this.otstup,this.otstup);
	this.panel.width=this.panel.height=this._wh-this.otstup*2;
	this.panel.color1="#777777"

	this.label=new DLabel(this.panel, this.panel.width,this.otstup,"null")
	this.label.fontSize=12
	this.label1=new DLabel(this.panel, this.panel.width,this.otstup+14,"null")
	this.label1.fontSize=12

	this.colorT=this.label1.colorText1;

	this.image=new DImage(this.panel, 0,0,null,function(){
		self.image.width=self.image.height=self.panel.width;

		if(self.image.picWidth>self.image.picHeight)self.image.height=self.panel.width*(self.image.picHeight/self.image.picWidth)
		if(self.image.picWidth<self.image.picHeight)self.image.width=self.panel.width*(self.image.picWidth/self.image.picHeight)
	
		var a=self.image.link.split("/")
		var s=a[a.length-1];
		if(s.length>20)s=s.substr(0,20)+"..";
		self.label.text=s;
		self.label1.text=self.image.picWidth+"x"+self.image.picHeight+"px";
		var p=0;
		var a=[2,4,16,32,64,128,256,512,1024,2048]
		for (var i = 0; i < a.length; i++) {
			if(self.image.picWidth==a[i])p++;
			if(self.image.picHeight==a[i])p++;
		}
		if(p!=2)self.label1.colorText1='#ff0000';
		else self.label1.colorText1=self.colorT


	})	
	this.image.width=this.image.height=this.panel.width;


	this.input=new DInput(this.dCont1,0,34,"1",function(){
		self.textur.repeat.x=this.value;
		self.fun("save");
	});

	this.input1=new DInput(this.dCont1,0,34,"1",function(){
		self.textur.repeat.y=this.value;
		self.fun("save");
	});
	this.input.height=this.input1.height=this.button.height;

	this.input.width= this.input1.width= (this.window.width-this.panel.width-this.otstup*4)/2
	this.input.x=this.panel.width+this.otstup*2
	this.input1.x=this.panel.width+this.otstup*3+this.input.width

	this.input.setNum(0.1);
	this.input1.setNum(0.1);

	this.buttonShow = new DButton(this.dCont1, 0, 0, "Show in BD", function (b) {
		aGlafMenu.textureBD.show(self.objDin);
	});
	this.buttonShow.width = this.window.width - this.panel.width - this.otstup * 4;
	this.buttonShow.height = this.button.height;
	this.buttonShow.x = this.panel.width + this.otstup * 2;
	this.buttonShow.y = this.window.height;
	this.buttonShow.visible = false;

	this.clear=function(){
		this.textur=null;
		this.active=false;
	}


	let loader = new THREE.TextureLoader();
	this.setTextureFromBD = function (objDin, dontSave) {
		this.textur = aGlaf.s3d.pm.tex.getById(objDin.id);
		this.image.link = '_';
		this.image.link = '../' + aGlaf.resursData + objDin.id + '/64.png';
		this.objDin = objDin;
		this.active = true;
		this.setDisplayMod(objDin);
		this.setTextur(this.textur);

		if (!dontSave) {
			self.fun("creatTextur");
		}
	}

	aGlafMenu.dragPic.addDCont(this.window, objDin => {
		this.setTextureFromBD(objDin);
	});

	this.setDisplayMod = function(objDin) {
		if (objDin) {
			this.buttonShow.visible = true;
			this.buttonShow.text = 'BD: ' + objDin.id;
			this.input.visible = false;
			this.input1.visible = false;
		} else {
			this.objDin = null;
			this.buttonShow.visible = false;
			this.input.visible = true;
			this.input1.visible = true;
		}
	}

	this.setTextur=function(t){
		this.textur=t;		
		if(this.textur==null){
			this.active=false;
		}else{
			this.active=true;
			this.input1.value=this.textur.repeat.y
			this.input.value=this.textur.repeat.x
		}
		
	}

	this.setPicLoad = function (s, dontSave){
		this.image.link=s;
		this.active=true;
		this.setDisplayMod(null);

		this.textur = loader.load(s);
		this.textur.wrapS = this.textur.wrapT = THREE.RepeatWrapping;
		this.setTextur(this.textur);
		if (!dontSave) {
			self.fun("creatTextur");
		}

	}

	this.setPic=function(file){	

		if(file)if(file.size>2096000){
			aGlaf.menu.mInfo.setFun(
				"Фаил велик!!",
				"Сорян но не катит, фаил больше 2 метров, если очень нужно качество, то тестируем в слабом, а потом ручками меняем в директории resources/data/<<иди обьекта>>/textur/<<имя файла>>",
                function(){ 
                        
                }
            );
			return
		}
		//1,048


		if(this.par.par.objBase.id){
			var ss='../resources/data/'+this.par.par.objBase.id+"/textur/"
			php.load({tip: 'mkdir', dir: ss}, function (e) {

				// php.load({tip: 'mkdir', dir: '../resources/scane/sky/'}, function (e) {
	           	var sss='resources/data/'+self.par.par.objBase.id+"/textur/"+file.name;

				   self.saveFile(ss, file, function(s){

					self.setPicLoad(s);
	            },sss) 
	            //})   
	        })
		}
		
	}

	this.saveFile = function (link, file, fun, linkOk ) {
        var l='../'+aGlaf.resurs+'tmp/'
        php.load({tip: 'mkdir', dir: l}, function (e) { 
            var ll=php.server+"src/upload.php";
            var form_data = new FormData();
            form_data.append('file', file); 
                 
            $.ajax({
                url: ll,
                dataType: 'text',
                cache: false,
                contentType: false,
                processData: false,
                data: form_data,
                type: 'post',
                success: function(php_script_response){
                   

                    var llll='../'+aGlaf.resurs+'tmp/';
                    var llllll=link;                    
                    php.load({tip: 'copyDir', dirWith: llll, dir: llllll}, function (e) {            
                        
                        php.load({tip: "removeDirRec", dir: llll, }, function (e) { 
   
                            fun(linkOk)
                            
                            
                        })            
                    })
                }
            });
        })
    }


}

TexturBlok.prototype = {
	
	set active (v) {
		if (this._active == v) return;
		this._active= v;
		this.dCont1.visible=this._active
		this.window.minimize=!this._active;		
		this.buttonX.visible=this._active
		if(this._active==true){
			this._height=32+this._wh;
			this.button.x=this.window.width-this.button.width-this.otstup*2-this.buttonX.width;
		}else{
			this._height=32;
			this.button.x=this.window.width-this.button.width-this.otstup;
		}
		this.window.height = this._height;
	},
	get active () {
		return this._active;
	},

	set visible (value) {
		if (this._visible == value) return;
		this._visible= value;
		if(value==true){
            this.dCont.add(this.window)
        }else{
            this.dCont.remove(this.window)
        }
	},
	get visible () {
		return this._visible;
	},
	set height (v) {
		if (this._height == v) return;
		this._height = v;
		
	},
	get height () {
		return this._height;
	},

};



