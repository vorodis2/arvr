

export class BVStand  {
  	constructor(par) {  		
  		this.type="BVStand";
  		var self=this;
        this.par=par;
        this.idArr=-1;
        this._otUp=20;
        this._otLeft=20;
        this._width=100;
        this._height=100;


        this._x=0;
        this._y=0;

        this._w=1;
        this._h=1;

        this._px=0;
        this._py=0;
        this._pz=0;
        this._pr=0;



        this._indexVideo = -1; 



        

        this.content3d = new THREE.Object3D();
        this.par.content3d.add(this.content3d);
        this.content3d.objBase=this;
        if(this.par.visi3D!=undefined)this.par.visi3D.addChildMouse(this.content3d)
       

        this.geometry=new BVGeometry(this);
        this.mesh=new THREE.Mesh(this.geometry.geom);
        this.mesh.position.y=this._otUp
        this.mesh.position.x=-this._width/2
        this.content3d.add(this.mesh)



        this.zad=new BVZad(this,this.par.matBag);


        this.setXYWH=function(_x,_y,_w,_h){
          
            this.geometry.x=_x;
            this.geometry.y=_y;
            this.geometry.w=_w;
            this.geometry.h=_h;
            this.geometry.update();
        }
              

        this.clear=function() { 
            this.par.content3d.remove(this.content3d);
            if(this.par.visi3D!=undefined)this.par.par.visi3D.removeChildMouse(this.content3d);
           /* for (var i = 0; i < 2; i++) {                
                if(this.content3d.children.length!=0){
                    this.content3d.parent.remove(this.content3d.children[0])
                    i=0
                }
            } */           
        }


        this.getObj=function() {  
            var o={} 
            o.indexVideo=this._indexVideo;
            o.otUp=this._otUp;
            o.otLeft=this._otLeft;
            
            o.x=this._x;
            o.y=this._y;
            o.w=this._w;
            o.h=this._h;

            o.width=this._width;
            o.height=this._height;


            o.px=this._px;
            o.py=this._py;
            o.pz=this._pz;
            o.pr=this._pr;           


            return o;
        }

        this.setObj=function(o) {  
            this.src = o.src;
           
            this.indexVideo=o.indexVideo;

            this._x=o.x;
            this._y=o.y;
            this._w=o.w;
            this._h=o.h;

            this.setXYWH(this._x,this._y,this._w,this._h)

     
            this.otUp=o.otUp;
            this.width=o.width;
            this.height=o.height;

            this.px=o.px;
            this.py=o.py;
            this.pz=o.pz;
            this.pr=o.pr;
        }
    }













    set px(value) {
        if(this._px!=value){         
            this._px= value;
            this.content3d.position.x=this._px
        }
    }    
    get px() { return  this._px;} 

    set py(value) {
        if(this._py!=value){         
            this._py= value;
            this.content3d.position.y=this._py
        }
    }    
    get py() { return  this._py;} 


    set pz(value) {
        if(this._pz!=value){         
            this._pz= value;
            this.content3d.position.z=this._pz
        }
    }    
    get pz() { return  this._pz;} 

    set pr(value) {
        if(this._pr!=value){         
            this._pr= value;
            this.content3d.rotation.y=this._pr*Math.PI/180
        }
    }    
    get pr() { return  this._pr;} 











    set indexVideo(value) {
        if(this._indexVideo!=value){         
            this._indexVideo= value;
            let mm=this.par.arrVideo[value];
            if(mm==undefined)mm=this.par.matBag;
            this.mesh.material= mm.material;             
        }
    }    
    get indexVideo() { return  this._indexVideo;} 



    set x(value) {
        if(this._x!=value){         
            this._x= value;
            this.setXYWH(this._x,this._y,this._w,this._h)
        }
    }    
    get x() { return  this._x;} 


    set y(value) {
        if(this._y!=value){         
            this._y= value;
            this.setXYWH(this._x,this._y,this._w,this._h)
        }
    }    
    get y() { return  this._y;} 

    set w(value) {
        if(this._w!=value){         
            this._w= value;
            this.setXYWH(this._x,this._y,this._w,this._h)
        }
    }    
    get w() { return  this._w;} 

    set h(value) {
        if(this._h!=value){

            this._h= value;
            this.setXYWH(this._x,this._y,this._w,this._h)
        }
    }    
    get h() { return  this._h;} 

    set otUp(value) {
        if(this._otUp!=value){         
            this._otUp= value;
            this.mesh.position.y=this._otUp
            this.zad.otUp= value;
        }
    }    
    get otUp() { return  this._otUp;} 

    set otLeft(value) {
        if(this._otLeft!=value){         
            this._otLeft= value;
            this.zad.otLeft= value;
        }
    }    
    get otLeft() { return  this._otLeft;} 

    set width(value) {
        if(this._width!=value){         
            this._width= value;
            this.geometry.width=this._width
            this.geometry.update()
            this.mesh.position.x=-this._width/2
            this.zad.width= value;
        }
    }    
    get width() { return  this._width;} 

    set height(value) {
        if(this._height!=value){         
            this._height= value;
            this.geometry.height=this._height
            this.geometry.update()
            this.zad.height= value;
        }
    }    
    get height() { return  this._height;} 


}




class BVGeometry  {
    constructor(par) {          
        this.type="BVGeometry";

        this.x=0;
        this.y=0;

        this.w=1;
        this.h=1;

        this.width=100;
        this.height=100;


        this.geom = new THREE.BufferGeometry();
        this.geom.addAttribute('position', new THREE.BufferAttribute(new Float32Array(3*4), 3));

        //'position', new THREE.BufferAttribute(ver, 2));

        this.arrPoz=[new THREE.Vector3(),new THREE.Vector3(),new THREE.Vector3(),new THREE.Vector3()]
        this.arrUv=[new THREE.Vector2(),new THREE.Vector2(),new THREE.Vector2(),new THREE.Vector2()]
   



        this.update = function () {
            this.arrPoz[0].set(this.width, 0, 0)
            this.arrPoz[1].set(0, 0, 0)
            this.arrPoz[2].set(0, this.height, 0)
            this.arrPoz[3].set(this.width, this.height, 0)

            
            this.arrUv[0].set(this.x, this.y);
            this.arrUv[1].set(this.x+this.w, this.y);
            this.arrUv[2].set(this.x+this.w, this.y+this.h);
            this.arrUv[3].set(this.x, this.y+this.h);


            let position = new Float32Array(6*3);
            let uv = new Float32Array(6*2);
            let normal= new Float32Array(6*3);           


            let sah=0

            position[sah]=this.arrPoz[0].x;  sah++
            position[sah]=this.arrPoz[0].y;  sah++
            position[sah]=this.arrPoz[0].z;  sah++          

            position[sah]=this.arrPoz[1].x;  sah++
            position[sah]=this.arrPoz[1].y;  sah++
            position[sah]=this.arrPoz[1].z;  sah++

            position[sah]=this.arrPoz[3].x;  sah++
            position[sah]=this.arrPoz[3].y;  sah++
            position[sah]=this.arrPoz[3].z;  sah++ 




            position[sah]=this.arrPoz[1].x;  sah++
            position[sah]=this.arrPoz[1].y;  sah++
            position[sah]=this.arrPoz[1].z;  sah++

            position[sah]=this.arrPoz[2].x;  sah++
            position[sah]=this.arrPoz[2].y;  sah++
            position[sah]=this.arrPoz[2].z;  sah++

            position[sah]=this.arrPoz[3].x;  sah++
            position[sah]=this.arrPoz[3].y;  sah++
            position[sah]=this.arrPoz[3].z;  sah++
            


            sah=0
            uv[sah]=this.arrUv[0].x;  sah++
            uv[sah]=this.arrUv[0].y;  sah++

            uv[sah]=this.arrUv[1].x;  sah++
            uv[sah]=this.arrUv[1].y;  sah++

            uv[sah]=this.arrUv[3].x;  sah++
            uv[sah]=this.arrUv[3].y;  sah++
           



            uv[sah]=this.arrUv[1].x;  sah++
            uv[sah]=this.arrUv[1].y;  sah++

            uv[sah]=this.arrUv[2].x;  sah++
            uv[sah]=this.arrUv[2].y;  sah++

            uv[sah]=this.arrUv[3].x;  sah++
            uv[sah]=this.arrUv[3].y;  sah++
            

  
            this.geom.removeAttribute('position');
            this.geom.removeAttribute('uv');
            this.geom.removeAttribute('normal');
            this.geom.addAttribute('position', new THREE.BufferAttribute(position, 3));
            this.geom.addAttribute('uv', new THREE.BufferAttribute(uv, 2));
            this.geom.addAttribute('normal', new THREE.BufferAttribute(normal, 3));
            
            this.geom.attributes.position.needsUpdate = true;
            this.geom.attributes.normal.needsUpdate = true;            
            this.geom.attributes.uv.needsUpdate = true;
            this.geom.computeBoundingSphere();
            this.geom.computeVertexNormals();
        }


        this.update()




    }
}



class BVZad  {
    constructor(par) {          
        this.type="BVZad";
        var self=this;
        this.par=par
        this._otUp=this.par._otUp;
        this._otLeft=this.par._otLeft;
        this._width=this.par._width;
        this._height=this.par._height;

        this.par=par;
        this.content3d = new THREE.Object3D();
        this.par.content3d.add(this.content3d);

       // this.content3d.visible=false

        this.arrC3D=[]
        for (var i = 0; i < 3; i++) {
            this.arrC3D[i]=new THREE.Object3D()
            this.content3d.add(this.arrC3D[i]);
        }

      /*  this.par.par.pm.getId(15, function(c3d){
            self.arrC3D[0].add(c3d); 
        }) 

        this.par.par.pm.getId(14, function(c3d){
            self.arrC3D[1].add(c3d);            
        }) 
        this.par.par.pm.getId(14, function(c3d){            
            self.arrC3D[2].add(c3d); 
        }) */



        this.draw=function(){            
            this.arrC3D[0].scale.x=this._width/100;
            this.arrC3D[0].scale.y=this._height/100;
            this.arrC3D[0].position.y=this._otUp;
          
            let s=(this._height+this._otUp)/100;
            this.arrC3D[1].scale.set(s,s,s);
            this.arrC3D[2].scale.set(s,s,s);
            this.arrC3D[1].position.x=this._width/2-this._otLeft;
            this.arrC3D[2].position.x=-this._width/2+this._otLeft;
            this.arrC3D[1].position.z=this.arrC3D[2].position.z=0.5*s;
        }


        this.draw();

    }

    set otUp(value) {
        if(this._otUp!=value){         
            this._otUp= value;
            this.draw()
        }
    }    
    get otUp() { return  this._otUp;} 

    set otLeft(value) {
        if(this._otLeft!=value){         
            this._otLeft= value;
            this.draw()
        }
    }    
    get otLeft() { return  this._otLeft;} 

    set width(value) {
        if(this._width!=value){         
            this._width= value;
            this.draw()
        }
    }    
    get width() { return  this._width;} 

    set height(value) {
        if(this._height!=value){         
            this._height= value;
            this.draw()
        }
    }    
    get height() { return  this._height;} 

}

