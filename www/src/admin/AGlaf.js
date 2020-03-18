
var aGlaf,php;
var visi3D
function AGlaf(main) { 
	aGlaf=this;	
	this.type="AGlaf";
	var self=this;
	this.content3d = new THREE.Object3D();
	this.content=new PIXI.Container();
	this.dCont=undefined;
    this.par=main
    this.otstup=2;
    this.wh=64
    this.whv=32+this.otstup*2
    this.widthBig=this.wh*3+this.otstup*3;
    this.objectBase=this.par.objectBase;
    this._sahMenu=0;

    this.resurs="resources/";
    this.resursPlus="data/";
    this.resursData=this.resurs+this.resursPlus;
    this.plusLink="";

    this.ser = window.location.href;
    var arrParams = this.ser.split("?");   
    var aa=arrParams[0].split("index")        
    this.server=aa[0];


    this.serverDo=aa[0];


    



    php=this.php=new Php();
	new Calc();

    var b=false;
    if(this.par.objectBase.scene.visi3D.alphaAd)if(this.par.objectBase.scene.visi3D.alphaAd==true)b=true;
    

	this.visi3D = new MVisi3D(main.contentHTML, null, false, true, true, true, b);		
	this.visi3D.yes3d = true;       	
    this.visi3D.groupObject.add(this.content3d);
    visi3D = this.visi3D
   // this.visi3D.renderer.setClearColor( 0x79bccc, 1);
    //this.visi3D.utility.debug = true; 
    //this.visi3D.utility.plane.visible=false;
    //this.visi3D.position3d.powerZum=25;

    //trace("==this.visi3D==",this.visi3D)

    //this.visi3D.cubeMap=new CubeMap();
    //this.visi3D.cubeMap.init(this.visi3D.renderer, this.visi3D.scene);

    //textureCube.mapping = THREE.CubeRefractionMapping;
    //trace("====",this.visi3D.cubeMap.getTexture())
    //this.visi3D.cubeMap.getTexture().mapping = THREE.CubeRefractionMapping;


   /* this.visi3D.getEnvMap = function () {
        return self.visi3D.cubeMap.getTexture();
    };*/


	/*main.contentHTML.appendChild(main.renderer.view);  		
	main.content2d.addChild(this.content);*/

	this.dCont=new DCont(main.contentHTML);


    this.save=function(){        
        this.s.saveTime()
    }
    this.s=new Save(this);
    this.menu;
    this.s;
    this.init=function(){        
        this.menu=new Menu(this, function(s, p){
            if(s=="open"){                
                self.s3d.loadMod(p);
                return;
            }

            if(s=="openMat"){                
                self.s3d.openMat(p);
                return;
            }

            if(s=="drag3DRects"){
                self.s3d.sHelp.dragObj();//подгоняем ректы
            }

            if(s=="dragPozition"){
                self.s3d.dragPozition(p);//подгоняем ректы
                
            } 
        });       
        this.s3d = new S3D(this);
        if(this.visi3D.utility.plane)this.visi3D.utility.plane.position.z=2 


        if(localS.object.indexGeometry)  this.s3d.indexGeometry= localS.object.indexGeometry 
             
    }


    var b=false;
    if(this.objectBase==undefined){
        this.objectBase={};
        b=true;
    }

    if(this.objectBase.array==undefined){
        this.objectBase.array=[];
        b=true;
    }
    if(this.objectBase.bd==undefined){
        this.objectBase.bd=[];
        b=true;
    }
    if(this.objectBase.three==undefined){
        this.objectBase.three=[];
        b=true;
    }
    if(this.objectBase.materials==undefined){
        this.objectBase.materials=[];
        b=true;
    }
    if (this.objectBase.textures == undefined) {
        this.objectBase.textures = [];
        b = true;
    }
/*
    for (var i = 0; i < this.objectBase.bd.length; i++) {
        if(this.objectBase.bd[i].obj!=undefined){
            delete this.objectBase.bd[i].obj
            b=true;
        }
    }
*/



    if(b==true) this.save();      
    this.init();
   

  

		
    

	this.update = function () {
		this.visi3D.upDate();		
	}

	this.sizeWindow = function(w,h){  
        var xx=	this.widthBig*2+this.otstup*3;		
		this.visi3D.sizeWindow(xx,this.whv,w-xx-this.widthBig,h-this.whv);
        
        this.menu.sizeWindow(w,h);			
	}
}    




function Save(aGlaf) {         
    var self=this;        
    this.type="Save";
    this.par=aGlaf;
    this.objectBase=this.par.objectBase;

        

    this.saveLoad=function(){ 
        sahBig++;
        var o={sah:sahBig}
        var ss  =JSON.stringify(o); 
        var l = "../"+this.par.resurs+"info.json";        
        aGlaf.php.load({tip:"saveJSON", link:l, text:ss},function(e){
            
        }); 
    }


    this.save=function(){ 

        /*this.objectBase.bd=[]
        this.objectBase.materials=[]
        this.objectBase.three=[]*/
        trace(this.objectBase)
        var ss  =JSON.stringify(this.objectBase); 
        var l = "../"+this.par.resurs+"config.json";        
        aGlaf.php.load({tip:"saveJSON", link:l, text:ss},function(e){
            //self.saveLoad()

        });       
    }

    this.sah=0
    this.saveTime=function(){
        this.sah++;
        var s=this.sah;
        setTimeout(function() {
            if(self.sah==s)self.save()
        }, 100);
    }       
}

