



function MenuBD(menu, fun) {  
    var self=this   
    this.type="Menu";
    this.par=menu;
    this._active=false
    this._sort=-2;   
    if(localS.object.sort!=undefined)this._sort=localS.object.sort; 
    

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

    this.mSort=new MSort(this, this.w);

    this._index=-1;
    this.objDin=undefined;
    this.gallery=new GalleryXZ(this.w, this.otstup ,68,function(){
        self.par.dragPic.testDrag(15,self.clik,self.drag);
    })
    this.gallery.width=this.widthBig;
    this.gallery.kolII=4;
    this.gallery.widthPic=46;
    this.gallery.heightPic=46;

    var naObj=undefined    
    this.gallery.funOver=function(e){
        naObj=e 
        trace(e)      
    }

    this.gallery.funOut=function(){
        naObj=undefined   
    }





    this.clik=function(){
        self.index=self.gallery.index;       
    }
    this.drag=function(){
        var o=self.gallery.array[self.gallery.index].object;
        trace(self.gallery.array[self.gallery.index].object)
        self.par.dragPic.start(32, aGlaf.resursData+""+o.id+"/64.png", o);       
    }

    
    self.par.dragPic.addFunAp(function(){        
        var num=self.mSort.testXY(self.par.dragPic._x, self.par.dragPic._y); 
        if(num!=null){

            self.gallery.array[self.gallery.index].object.sort=num;
            self.reDrag()
            aGlaf.save();
            return
        }

        if(naObj!=undefined){
            if(aGlaf.menu.dragPic.object.id!=undefined){
                if(naObj.object && naObj.object.id){
                    if(aGlaf.menu.dragPic.object.id!=naObj.object.id){
                        var idS=aGlaf.menu.dragPic.object.id
                        var idNa=naObj.object.id
                        self.par.mInfo.setFunInput(
                            "перезапись иконки",
                            "Картинка с тоскания запишеться в эту позицию, идишник с донора",
                            idS,           
                            function(){ 
                                trace("sdfsdf")
                                startPapis(idS,idNa)
                            }
                        ); 

                    }
                }
            }
        }
        

        
    })


    this.redragTime=function(){
        aGlaf.plusLink="?x=" + Math.random();
        this.reDrag()
        setTimeout(function() {
            aGlaf.plusLink='';
        }, 500);
    }

    var aZZ=[]
    this.reDrag=function(){       
        var b=true
        if(this._sort==-1){
            this.gallery.start(self.objectBase.bd);
            b=false; 
        }
        if(this._sort==-2){
            aZZ=[];
            for (var i = 0; i < self.objectBase.bd.length; i++) {
                if(self.objectBase.bd[i].sort==undefined)self.objectBase.bd[i].sort=-1;
                if(self.objectBase.bd[i].sort==-1){
                    aZZ.push(self.objectBase.bd[i])
                }
            }
            this.gallery.start(aZZ);            
            b=false; 
        }

        if(b==true){
            aZZ=[];
            for (var i = 0; i < self.objectBase.bd.length; i++) {
                if(self.objectBase.bd[i].sort==undefined)self.objectBase.bd[i].sort=-1;
                if(self.objectBase.bd[i].sort==this._sort){
                    aZZ.push(self.objectBase.bd[i])
                }
            }
            this.gallery.start(aZZ);
        }
        
    }




    this.down=function(){
        if(this.idArr==0){//создание
           /*self.par.mInfo.setFun("Удаление обьекта","Обьект будет удален из бд, не вычещаеться из дерева, и может привести к падениям, короче окуратно!!!",
                    function(){ 
                        var id=self.grtMaxPlus()
                        php.load({tip: 'mkdir', dir: '../'+aGlaf.resursData + id}, function (e) {                        
                            php.load({tip: 'copyDir', dirWith: '../'+aGlaf.resurs+'base/', dir: '../'+aGlaf.resursData + id + '/'}, function (e) {    
                                var o={id:id, title:id, name:"xz",key:"o_"+id}
                                self.objectBase.bd.unshift(o);                    
                                aGlaf.save();
                                self.reDrag();               
                            });
                        })
                    }
                ); */  

                  

            var id=self.grtMaxPlus()
            self.par.mInfo.setFunInput(
                "Создание обьекта",
                "Задаюм имя идишник оьекта, НЕ ВБИВАЕМ СВОЙ, (затрет если таковой есть, или изменит порядок, короче не меняем, функция созданна на крайняк от патери конфига, только цифры)",
                id,           
                function(){ 
                    var id=self.par.mInfo.text*1
                    if(isNaN(id)==false)
                    php.load({tip: 'mkdir', dir: '../'+aGlaf.resursData + id}, function (e) {                        
                        php.load({tip: 'copyDir', dirWith: '../'+aGlaf.resurs+'base/', dir: '../'+aGlaf.resursData + id + '/'}, function (e) {    
                            var o={id:id, title:id, name:"xz",key:"o_"+id}
                            self.objectBase.bd.unshift(o);                    
                            aGlaf.save();
                            self.reDrag();               
                        });
                    })               
                    //self.creatMatName(self.par.mInfo.text)
                }
            );    


           /* var id=self.grtMaxPlus()
            php.load({tip: 'mkdir', dir: '../'+aGlaf.resursData + id}, function (e) {                        
                php.load({tip: 'copyDir', dirWith: '../'+aGlaf.resurs+'base/', dir: '../'+aGlaf.resursData + id + '/'}, function (e) {    
                    var o={id:id, title:id, name:"xz",key:"o_"+id}
                    self.objectBase.bd.unshift(o);                    
                    aGlaf.save();
                    self.reDrag();               
                });
            })*/

            
        }
        if(this.idArr==1){//Убиваем
            if(self.objDin!=undefined){                
                self.par.mInfo.setFun("Удаление обьекта","Обьект будет удален из бд, не вычещаеться из дерева, и может привести к падениям, короче окуратно!!!",
                    function(){              
                        var dir= '../'+aGlaf.resursData + self.objDin.id;              
                        php.load({tip: "removeDirRec", dir: dir}, function (e) {
                            var a=self.index;                    
                            var b=self.objectBase.bd.splice(a,1);
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
                   var b=self.objectBase.bd.splice(a,1);
                    self.objectBase.bd.splice(a-1,0,b[0])
                    aGlaf.save();
                    self.reDrag()                   
                    self.index=a-1; 
                }
            }           
        }

        if(this.idArr == 3){//>>>>>>
            if(self.objDin!=undefined){
                var a=self.index;
                if(a<self.objectBase.bd.length-1&&a!=-1) {
                    var b=self.objectBase.bd.splice(a,1);
                    self.objectBase.bd.splice(a+1,0,b[0])
                    aGlaf.save();                    
                    self.reDrag();                 
                    self.index=a+1; 
                }
            }           
        }


    }
    var b;
    var ww=28;
    for (var i = 0; i < 4; i++) {
        b=new DButton(this.w,(this.otstup+ww)*i+this.otstup, this.otstup, " ",this.down);
        b.idArr=i;
         
        if(i==0)b.text="+";
        if(i==1)b.text="-";
        if(i==2)b.text="<"; 
        if(i==3)b.text=">"; 
        
        b.width=ww;
        b.height=ww;

    }


    this.grtMaxPlus = function(){  
        var r=0;
        for (var i = 0; i < this.objectBase.bd.length; i++) {
            if(this.objectBase.bd[i].id*1>r)r=this.objectBase.bd[i].id*1
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
   // this.reDrag();
  
    this.mSort.sort=this._sort; 
    this.reDrag()  



    function startPapis(idS,idNa){
        trace(idS,idNa);
        const a=['32.png','64.png','100.png','128.png','256.png','original.png',
                'y32.png','y64.png','y100.png','y128.png','y256.png','yoriginal.png']

        for (var i = 0; i < a.length; i++) {            
            let link='../'+aGlaf.resursData + idS + '/'+a[i]
            let link1='../'+aGlaf.resursData + idNa + '/'+a[i]
            php.load({tip: 'copy', 
                dirWith:    link, 
                dir:        link1});

        }
        setTimeout(function() {self.reDrag(); }, 100);
        
                  
    }





    

    Object.defineProperty(this, "index", {
        set: function (value) {            
            this._index=value;
            this.objDin=undefined;           
            this.gallery.index=value;
            if(this.gallery.array[value]!=undefined){                
                this.objDin=this.gallery.array[value].object;
                this.par.menuObject.setObj(this.objDin);                
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

     Object.defineProperty(this, "sort", {
        set: function (value) { 

            if(this._sort!=value){
                this._sort=value; 

                localS.object.sort=value
                localS.save()
                this.mSort.sort=value; 
                this.reDrag()             
            }           
        },
        get: function () {
            return this._sort;
        }
    });
  
}


function MSort(par, cont) {  
    var self=this   
    this.type="MSort";
    this.par=par;
    
    this._sort=-3;

    this.otstup=aGlaf.otstup;
    this.wh=aGlaf.wh;
    this.whv=aGlaf.whv;
    this.widthBig=aGlaf.widthBig;



    this.dCont=new DCont(cont);
    this.panel=new DPanel(this.dCont, this.otstup, 34);
    this.panel.height=32;
    this.panel.width= this.widthBig-this.otstup*2;


    this.kol=5;
    var ww=(130) / this.kol;

    this.bAll=new DButton(this.panel.content, this.otstup+155, this.otstup ,"A", function(){
        self.par.sort=-1;   
    }) 
    this.bAll.width=ww-2;
    this.bAll.height=this.panel.height-this.otstup*4;
    

    this.bNot=new DButton(this.panel.content, this.otstup, this.otstup ,"N", function(){
        self.par.sort=-2;   
    }) 
    this.bNot.width=ww-2;
    this.bNot.height=this.panel.height-this.otstup*4
    this.bNot.alpha=0.5;


    
    this.aaaa=[];
    for (var i = 0; i < this.kol; i++) {
        this.aaaa[i] = new DButton(this.panel.content, ww-2+this.otstup*2+(ww)*i, this.otstup ,i+"", function(){
            self.par.sort=this.idArr;
        })
        this.aaaa[i].width=ww-2;
        this.aaaa[i].idArr=i;
        this.aaaa[i].height=this.panel.height-this.otstup*4
    }


    this.testXY=function(_x,_y){
        var r=null;
        for (var i = 0; i < this.aaaa.length; i++) {
            if(this.testXY2(this.aaaa[i],_x,_y)==true)return i;
        }

        if(this.testXY2(this.aaaa[0],_x+32,_y)==true){
            return -1;
        }

        if(this.testXY2(this.bAll,_x,_y)==true)return -1;


        return r;
    }

    this.getBigPar=function(o, p){
        if(o.parent==undefined)return o;
        
        if(o.x)p.x+=o.x;
        if(o.y)p.y+=o.y;
        return this.getBigPar(o.parent, p)
    }
    
    var oo1={x:0,y:0}
    this.testXY2=function(_o,_x,_y){
        oo1.x=0        
        oo1.y=0

        this.getBigPar(_o, oo1);
        if(oo1.x<_x)if(oo1.x+_o.width>_x){
            if(oo1.y<_y)if(oo1.y+_o.height>_y){                
                return true
            }            
        }

       
        return false;

    }   


    Object.defineProperty(this, "sort", {
        set: function (value) {            
            if(this._sort!=value){
                this._sort=value; 
                this.bAll.alpha=1;
                this.bNot.alpha=1;
                
                for (var i = 0; i < this.kol; i++) {
                    if(i==this._sort){
                        this.aaaa[i].alpha=0.5;
                        
                    }else{
                        this.aaaa[i].alpha=1;
                    }                    
                }
                if(this._sort==-1)this.bAll.alpha=0.5;
                if(this._sort==-2)this.bNot.alpha=0.5;

                          
                             
            }           
        },
        get: function () {
            return this._sort;
        }
    });
}


