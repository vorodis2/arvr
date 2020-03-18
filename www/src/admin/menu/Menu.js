



function Menu(aGlaf, fun) {  
    var self=this;  
    this.type="Menu";
    this.par=aGlaf;
    this.objectBase=this.par.objectBase;
    this.fun=fun;
    this.dCont=new DCont(this.par.dCont);

    
    this.dragPic=new DragPic(this.dCont);

   

    this.array=[]

    this.array.push(this.textureBD = new TextureBD(this, function (s, p) { self.fun(s, p) }));

    this.array.push(this.menuVerh=new MenuVerh(this, function(s,p){ self.fun(s,p)}));
    this.array.push(this.menuBD=new MenuBD(this, function(s,p){ self.fun(s,p)}));  
    this.array.push(this.menuObject=new MenuObject(this, function(s,p){ self.fun(s,p)}));
    this.array.push(this.menuThree=new MenuThree(this, function(s,p){ self.fun(s,p)}));
    this.array.push(this.menuScene=new MenuScene(this, function(s,p){ self.fun(s,p)}));
    

    this.array.push(this.matBD=new MatBD(this, function(s,p){ self.fun(s,p)}));  
    this.array.push(this.matObject=new MatObject(this, function(s,p){ self.fun(s,p)}));

    this.array.push(this.naObj=new NaObj(this, function(s,p){ self.fun(s,p)}));

    this.array.push(this.dopInfo=new DopInfo(this, function(s,p){ self.fun(s,p)}));

    this.mInfo=new MInfo(this.par.dCont);



    var script = document.createElement('script');
    // мы можем загрузить любой скрипт с любого домена
    
    script.onload = function() {
        self.debagThree=new DebagThree(self.par.dCont,550,2,self.par.visi3D.scene,self.par.visi3D);
        self.debagThree.setObj(self.par.s3d.sMod.content3d)
        
    };
    script.src = "src/pm/DebagThree.js"
    document.head.append(script);

    

    




    this.sizeWindow = function(w,h){  
        for (var i = 0; i < this.array.length; i++) {
            this.array[i].sizeWindow(w,h)
        }  
        this.mInfo.sizeWindow(w,h)      
    }
}

