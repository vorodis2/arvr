



function MatBD(menu, fun) {  
    var self=this   
    this.type="MatBD";
    this.par=menu;
    this._active=false


    this.otstup=aGlaf.otstup;
    this.wh=aGlaf.wh;
    this.whv=aGlaf.whv;
    this.widthBig=aGlaf.widthBig;
    this.objectBase=this.par.objectBase;

    this.objectBase=this.par.objectBase;
    this.dCont=new DCont(this.par.dCont);

    this.w=new DWindow(null, 0, this.whv," ");
    this.w.width=this.widthBig;
    this.w.dragBool=false;
    this.w.hasMinimizeButton=false;

    this._width=100;
    this._height=100;

    this._index=-1;
    this.objDin=undefined;
    this.gallery=new GalleryXZ(this.w, this.otstup ,32,function(){
        //self.index=this.index;

        self.par.dragPic.testDrag(15,self.clik,self.drag);
    })
    this.gallery.width=this.widthBig;
    this.gallery.kolII=4;
    this.gallery.widthPic=46;
    this.gallery.heightPic=46;


    this.clik=function(){
        self.index=self.gallery.index;
       
    }
    this.drag=function(){
        var o=self.gallery.array[self.gallery.index].object;
        self.par.dragPic.start(32, aGlaf.resursData+""+o.id+"/64.png", o);       
    }

    



    this.redragTime=function(){
        aGlaf.plusLink="?x=" + Math.random();
        this.reDrag();
        setTimeout(function() {
            aGlaf.plusLink='';
        }, 500);
    }

    this.reDrag=function(){        
        this.gallery.start(self.objectBase.materials);
    }

    this.down=function(){
        var id=self.grtMaxPlus()
       
        if(this.idArr==0){//создание
            self.creatMat()
            

        }
        if(this.idArr==1){//Убиваем
            if(self.objDin!=undefined){                
                self.par.mInfo.setFun("Удаление обьекта","Обьект будет удален из бд, не вычещаеться из дерева, и может привести к падениям, короче окуратно!!!",
                    function(){              
                        var dir= '../'+aGlaf.resursData + self.objDin.id;              
                        php.load({tip: "removeDirRec", dir: dir}, function (e) {
                            var a=self.index;                    
                            var b=self.objectBase.materials.splice(a,1);
                            aGlaf.save();
                            self.reDrag()                   
                            self.index=a;
                        });
                    }
                );
            }           
        }
       if(this.idArr == 2){//<<<<<<
            if(self.objDin!=undefined){
                var a=self.index;
                if(a>0) {
                   var b=self.objectBase.materials.splice(a,1);
                    self.objectBase.materials.splice(a-1,0,b[0])
                    aGlaf.save();
                    self.reDrag()                   
                    self.index=a-1; 
                }
            }           
        }

        if(this.idArr == 3){//>>>>>>
            if(self.objDin!=undefined){
                var a=self.index;
                if(a<self.objectBase.materials.length-1&&a!=-1) {
                    var b=self.objectBase.materials.splice(a,1);
                    self.objectBase.materials.splice(a+1,0,b[0])
                    aGlaf.save();                    
                    self.reDrag();                 
                    self.index=a+1; 
                }
            }           
        }
    }


    this.creatMat = function(){  
        var id="m_"+self.grtMaxPlus(); 
        self.par.mInfo.setFunInput(
            "Создание матерьяла",
            "Задаюм имя идишника матерьяла, если такой есть то он не срабоает",
            id,           
            function(){                 
                self.creatMatName(self.par.mInfo.text)
            }
        );

       /* php.load({tip: 'mkdir', dir: '../'+aGlaf.resursData + id}, function (e) {                        
            php.load({tip: 'copyDir', dirWith: '../'+aGlaf.resurs+'base/', dir: '../'+aGlaf.resursData + id + '/'}, function (e) {    
                var o={id:id, title:"title_"+id, name:"name_"+id,key:"o_"+id}
                self.objectBase.materials.unshift(o);                    
                aGlaf.save();
                self.reDrag();               
            });
        })*/

    }

    this.creatMatName = function(name){  
        var b=true
        php.load({tip: 'getDiractFiles', dir: '../'+aGlaf.resursData}, function (e) {              
            var a = e.split(",");
            for (var i = 0; i < a.length; i++) {
                if(a[i]==name){
                    b=false
                }
            }

            if(b==false){
                self.par.mInfo.setFun("Такой иди есть!!","Удалите его в начале",function(){})                 
            }else{
                var id=name; 
                php.load({tip: 'mkdir', dir: '../'+aGlaf.resursData + id}, function (e) {                        
                    php.load({tip: 'copyDir', dirWith: '../'+aGlaf.resurs+'base/', dir: '../'+aGlaf.resursData + id + '/'}, function (e) {    
                        var o={id:id, title:"title_"+id, name:"name_"+id,key:"o_"+id}
                        self.objectBase.materials.unshift(o);                    
                        aGlaf.save();
                        self.reDrag();               
                    });
                })
            }

            
               
        })
       
    }


    var b;
    var ww=28;
    for (var i = 0; i < 4; i++) {
        b=new DButton(this.w,(this.otstup+ww)*i+this.otstup, this.otstup, " ",this.down);
        b.idArr=i;
        b.width=ww;
        b.height=ww; 
        if(i==0)b.text="+";
        if(i==1)b.text="-";
        if(i==2)b.text="<"; 
        if(i==3)b.text=">"; 
    }


    this.grtMaxPlus = function(){  
        var r=0;
        var a=[]
        for (var i = 0; i < this.objectBase.materials.length; i++) {
            a=this.objectBase.materials[i].id.split("_");            
            if(a[1]*1>r)r=a[1]*1;
        }
        r+=1;
        return r
    }


    this.sizeWindow = function(w,h){ 
        this._width=w;
        this._height=h;
        this.w.height= h- this.whv- this.otstup; 
        this.gallery.height=this.w.height-32;   
    }
    this.reDrag();

   //setTimeout(function() {self.index=0}, 10);
   

    Object.defineProperty(this, "index", {
        set: function (value) {            
            this._index=value;
            this.objDin=undefined;           
            this.gallery.index=value;
            
            if(this.gallery.array[value]!=undefined){  
                        
                this.objDin=this.gallery.array[value].object;

                this.par.matObject.setObj(this.objDin);                 
                this.par.matObject.objDin=this.objDin;              
            }         
        },
        get: function () {
            return this._index;
        }
    });



    Object.defineProperty(this, "active", {
        set: function (value) {            
            if(this._active!=value){
                this._active=value;                
                if(value==true){
                    this.dCont.add(this.w)
                }else{
                    this.dCont.remove(this.w)
                }                
            }           
        },
        get: function () {
            return this._active;
        }
    });
  
}



