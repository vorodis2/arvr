




function MBPic(c,x,y,f) {  
    var self=this   
    this.type="MBas";
    self.fun=f
    this.otstup=aGlaf.otstup;
    this.wh=aGlaf.wh;
    this.whv=aGlaf.whv;
    this.widthBig=aGlaf.widthBig;
    this.dCont=new DCont(c);
    this.dCont.x=x;
    this.dCont.y=y;
 
    this.y=y
    this.aSaze=[32,64,100,128,256,"original"];
    this.height=55
    this.o=undefined
    this.o11=undefined

    this.panel=new DPanel(this.dCont, 0, 0)
    this.panel.width=this.widthBig-this.otstup*3;
    this.panel.height=this.height;

    this.fotoDrag=new FotoDrag(function(){
        self.narezka();
    })



    this.arBase=[]
    this.narezka=function(){
        this.arBase=[]        
        var s
        for (var i = 0; i < this.aSaze.length; i++) {
            s=this.aSaze[i]+".png";
            this.arBase.push( this.fotoDrag.na(this.aSaze[i], 0));
            this.arBase.push(s);
        }
        for (var i = 0; i < this.aSaze.length; i++) {
            s="y"+this.aSaze[i]+".png";
            this.arBase.push( this.fotoDrag.na(this.aSaze[i], 1));
            this.arBase.push(s);
        }
        self.fun("sArray", this.arBase); 

        this.button.loadImeg(this.arBase[2])
    } 


    this.button=new DButton(this.panel,this.otstup,this.otstup," ",function(base64){        
        if(base64!=undefined){ 
            self.l.text=this.files[0].name;            
            self.o.orig=this.files[0].name;
            self.fun("baseOrig", base64, this.files[0].name); 
            self.fotoDrag.setLink(base64);
        }
    })
    this.button.startFile();



   

    this.button.width = this.button.height= this.height- this.otstup*3;
    var s=""
    for (var i = 0; i < this.aSaze.length; i++) {
        s+=this.aSaze[i]+","
    }    
    this.l=new DLabel(this.panel,this.otstup*2+this.button.width,this.otstup,s)   
    this.l.fontSize=10
    this.l.width=this.panel.width-this.otstup*2+this.button.width;


    this.l=new DLabel(this.panel,this.otstup*2+this.button.width,this.otstup+12,""+this.aSaze[0]+".png"+"  не сжат   x"+this.aSaze[0]+".png"  )   
    this.l.fontSize=10
    this.l.width=this.panel.width-this.otstup*2+this.button.width;

    this.l=new DLabel(this.panel,this.otstup*2+this.button.width,this.otstup+32,"ndsfg");   
    this.l.width=this.panel.width-this.otstup*2+this.button.width;

    this.butPic=new DButton(this.panel,this.panel.width-20-this.otstup,this.panel.height-20-this.otstup," ",function(base64){        
         

        var d=aGlaf.visi3D.utility.debug;
        aGlaf.visi3D.utility.debug=false
        aGlaf.s3d.sHelp.content3d.visible=false
        var sk=aGlaf.visi3D.utility.sky.active
        aGlaf.visi3D.utility.sky.active=false


        var alpha=true;
        var color=0xffffff;

        if(aGlaf.visi3D.alpha==false){
            alpha=false;            
            aGlaf.visi3D.renderer.setClearColor(color, 1);
        }

        var ww=aGlaf.visi3D._width
        var hh=aGlaf.visi3D._height
        
        aGlaf.visi3D.sizeWindow(0,0,256,256)
        aGlaf.visi3D.render();

        var base64 = aGlaf.visi3D.renderer.domElement.toDataURL("image/png");
        self.l.text="xz.png";            
        self.o.orig="xz.png";
        self.fun("baseOrig", base64, "xz.png"); 
        self.fotoDrag.setLink(base64);


        
        aGlaf.visi3D.sizeWindow(0,0,ww,hh)
        aGlaf.visi3D.utility.debug=d
        aGlaf.s3d.sHelp.content3d.visible=true
        aGlaf.visi3D.utility.sky.active=sk

        if(alpha==false){
            aGlaf.visi3D.renderer.setClearColor(aGlaf.visi3D.color, 1);
            
        }


        sizeWindow()

       

    })
    this.butPic.loadImeg("src/admin/icon/i2.png")
    this.butPic.width=this.butPic.height=20


    this.butPic1=new DButton(this.panel,this.panel.width-20*2-this.otstup,this.panel.height-20-this.otstup," ",function(base64){        
         

        var d=aGlaf.visi3D.utility.debug;
        aGlaf.visi3D.utility.debug=false
        aGlaf.s3d.sHelp.content3d.visible=false
        var sk=aGlaf.visi3D.utility.sky.active
        aGlaf.visi3D.utility.sky.active=false


        var alpha=true;
        var color=0xffffff;

        if(aGlaf.visi3D.alpha==false){
            alpha=false;            
            aGlaf.visi3D.renderer.setClearColor(color, 1);
        }

        var ww=aGlaf.visi3D._width
        var hh=aGlaf.visi3D._height
        
        aGlaf.visi3D.sizeWindow(0,0,256,256)
        aGlaf.visi3D.render();

        var base64 = aGlaf.visi3D.renderer.domElement.toDataURL("image/png");
        self.l.text="xz.png";            
        self.o.orig="xz.png";
        self.fun("baseOrig", base64, "xz.png"); 
        self.fotoDrag.setLink(base64,true);


        
        aGlaf.visi3D.sizeWindow(0,0,ww,hh)
        aGlaf.visi3D.utility.debug=d
        aGlaf.s3d.sHelp.content3d.visible=true
        aGlaf.visi3D.utility.sky.active=sk

        if(alpha==false){
            aGlaf.visi3D.renderer.setClearColor(aGlaf.visi3D.color, 1);
            
        }
        sizeWindow()      

    })
    this.butPic1.loadImeg("src/admin/icon/i2.png")
    this.butPic1.width=this.butPic1.height=20
    this.butPic1.color="#777777"



    this.setObj= function(o){ 

        this.o=o          
        this.l.text=this.o.orig; 
        this.o11=o
        var link=aGlaf.resursData+""+o.id+"/64.png"
        this.button.loadImeg(link);       
    }
}


function FotoDrag(fun) {  
    var self=this   
    this.type="FotoDrag";
    this.fun=fun;
    this.width=256;             
    this.height=256;
    





    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');
    var image = new Image();

    
    var image1 = new Image();



    var bbb
    image.onload = function() {        
        
        canvas.width = image.width;
        canvas.height = image.height;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(image, 0, 0);
        ctx.filter = null;
        var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        var pixels = imageData.data;
        var n=1
        for (var i = 0; i < pixels.length; i += 4) {
            pixels[i]     = n; 
            pixels[i + 1] = n; 
            pixels[i + 2] = n; 
        }   
        ctx.filter = 'blur(5px)';     
        ctx.putImageData(imageData, 0, 0);
        bbb=true
        image1.src=canvas.toDataURL('image/png');
    }

    image1.onload = function() {        
        if(bbb==true){          
            ctx.clearRect(0, 0, image1.width, image1.height);
            ctx.filter = 'blur(5px)'; 
            ctx.drawImage(image1, 0, 0, image1.width, image1.height); 

            bbb=false;
            image1.src=canvas.toDataURL('image/png');
        }
        self.fun()
    }



    this.bool=false    
    this.setLink=function(base64,bool){
        this.bool=false
        if(bool)this.bool=bool;        
        image.src = base64;
    }

    this.na=function( num, tip){   

        canvas.width = num;
        canvas.height = num;
        ctx.clearRect(0, 0, num, num);
        //ctx.drawImage(image, 0, 0, num, num);
        if(self.bool)ctx.drawImage(image1, 0, 0, num, num);
        ctx.drawImage(image, 0, 0, num, num);

     
       // ctx.drawImage(image, 0, 0, num, num);

        return canvas.toDataURL('image/png');
    }





}

