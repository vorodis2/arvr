

var localS
function AMain(fun) { 
		
	this.type="AMain";

	var self=this;

	this.stage = null;
	this.content2d = null;
	this.renderer = null;
	this.glaf=null;
	this._width=100;
	this._height=100;
	self.resolution=1
	self.objectBase=null
    this.localStorage
    this.active =false

	this.contentHTML= document.createElement('div');
	this.contentHTML.style.position = 'fixed';
	this.contentHTML.style.top = '0px';
	this.contentHTML.style.left = '0px';
	

		


	this.start = function () {	
		
		this.stage = new PIXI.Container();
		this.renderer = new PIXI.autoDetectRenderer(this._width, this._height, {antialias: true, transparent: true, preserveDrawingBuffer: true });
		this.renderer.view.style.position = 'fixed';
		//this.contentHTML.appendChild(this.renderer.view);
		this.content2d = new PIXI.Container();
		self.stage.addChild(this.content2d);
		var t = new PIXI.ticker.Ticker();
		t.minFPS = 50;
		t.add(this.tick, this);
		t.start();         
        localS = new LocalStorage(function(){self.init2();},"admin_Larij_v4");        
	};


	this.keydown=function(e){
        if(event.keyCode==17)self.boolCTRL=true

        if(event.keyCode==81&&self.boolCTRL)  {
            self.active =  !self.active
            localS.object.admin=self.active;
            localS.save();


            if(self.active==true)document.body.appendChild(self.contentHTML);
            else document.body.removeChild(self.contentHTML);
        }            
    }
    this.keyup=function(e){
        if(event.keyCode==17)self.boolCTRL=false
    }

    window.addEventListener( 'keydown', this.keydown );    
    window.addEventListener( 'keyup', this.keyup );  

    

	this.init2 = function () {
		localS.object.admin=true
		if(localS.object.admin==true){
			this.active=true
			document.body.appendChild(this.contentHTML);
		}		

		new StylePL102(this.stage, this.renderer, this.contentHTML);// document.body);		
        self.glaf = new AGlaf(this)          
		fun("init");
	}





	this.tick = function () {
		self.renderer.resolution = window.devicePixelRatio * self.resolution;// ставим разрешение рендера (соотношение пикселей)
		self.renderer.render(self.stage);
		TWEEN.update();	
		if (self.glaf) {
			self.glaf.update();
		}			
	}






	this.sizeWindow = function(w,h){ 
		self._width=w;
	    self._height=h;
	    if(self.renderer){
  			var precresol = self.resolution;// запоминаем предыдущее разрешение пикселей рендера
			self.renderer.view.style.width = self._width + 'px';
			self.renderer.view.style.height = self._height + 'px';
			
			self.renderer.resolution = 1;// перед изменение размера в дефолт
			self.renderer.resize(self._width, self._height);
			self.renderer.resolution = precresol;// ставим обратно разрешение

		}
		if (self.glaf) { 
			self.glaf.sizeWindow(w,h)
		}			
	}


	$.ajax({
        url: "resources/config.json",
        success: function function_name(data) {                         
            if(typeof data === "string") {
				var conf = JSON.parse(data)
				self.objectBase = conf;
			} else self.objectBase = data;	

			self.start();			
                             
        },
        error:function function_name(data) {

			self.start();
        }
    });  
}








