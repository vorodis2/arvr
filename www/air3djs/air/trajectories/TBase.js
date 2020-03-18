



/*
import { Menu } from './menu/Menu.js';
import { Home } from './floor/Home.js';

import { MVisi3D } from '../libMy/visi3D/MVisi3D.js';
import { SceneSB } from '../libMy/visi3D/SceneSB.js';

import { Grid } from './fManager/Grid.js';*/


import {  PositionFun } from './../Calc.js';


export class TBase  {
  	constructor(main) {  		
  		this.type="TBase";
        this.par=main
  		var self=this;
        this.mobile = this.par.mobile;
        this.debug = this.par.debug;

        this._radius=500;

        

        this.array=[];
     
        this.content3d = new THREE.Object3D();

        this.gSphere = new THREE.SphereBufferGeometry( 1, 12, 12 );
        this.material = new THREE.MeshBasicMaterial( {color: 0xaa0000} );        
       
        this.gBox = new THREE.BoxBufferGeometry( 1, 1, 1 );
        this.material1 = new THREE.MeshBasicMaterial( {color: 0x00aa00} );

        this.material2 = new THREE.MeshBasicMaterial( {color: 0x0000aa/*, transparent:true,opacity:0.5*/} );

        this.gltfLoader = new THREE.GLTFLoader()


        if(this.debug==true){
            this.contDebag = new THREE.Object3D();
            this.content3d.add(this.contDebag)
        }


        this.sob= function(s,p){


        }



        this.getTraject = function(p,p1){
            for (let i = 0; i <  this.array.length; i++) {
                if(this.array[i].life==false){
                    return this.array[i];
                }
            }

            let traject=new Traject(this,this.array.length,this.sob)
            this.array.push(traject);
            
            return traject;
        }



        //базовое создание обьекта
        this.creat = function(p,p1){
            let traject=this.getTraject();
            traject.creat(p,p1)
            traject.life=true;

            return traject;
        }


        this.clear = function(){
            for (var i = 0; i < this.array.length; i++) {
                this.array[i].life=false
            }
        }




        this.getParName=function(c3d,name){            
            if(c3d[name]!=undefined)return c3d[name];
            if(c3d.parent!=undefined)return this.getParName(c3d.parent,name);
            return null
        }




        this.getObj = function(){ 
            var o={array:[]}
            for (var i = 0; i < this.array.length; i++) {
                if(this.array[i].life==false)continue;
                o.array.push(this.array[i].getObj())
            }
            return o
        }


        this.setObj = function(o){ 
            this.clear();
            for (var i = 0; i < o.array.length; i++) {
                let traject=this.getTraject();
                traject.setObj(o.array[i])
                traject.life=true;             
            }           
        }


        this.setAllValue = function (num) {
            for (var i = 0; i < this.array.length; i++) {
                if(this.array[i].life==false)continue;
                this.array[i].value=num
            }

        }


		this.update = function () {
		            
		}

      
  		this.sizeWindow = function(w,h,s){    			

            
  		}

  	}


}


export class Traject  {
    constructor(par, idArr, fun) {         
        this.type="Traject";
        this.par=par;
        this.idArr=idArr;
        this.fun=fun;
        var self=this;
        this.mobile = this.par.mobile;
        this.debug = this.par.debug;
        this.content3d = new THREE.Object3D();


        this._life=false;
        this._value=0;


        this._style="plus";
        this._style2="centripetal";
        this._sPnum=20;
        this._amountPoints=6;
        var ARC_SEGMENTS = 200;
        

        var geometry = new THREE.BufferGeometry();
        geometry.setAttribute( 'position', new THREE.BufferAttribute( new Float32Array( ARC_SEGMENTS * 3 ), 3 ) );

        var curve = new THREE.CatmullRomCurve3( [ ] )
        curve.curveType = this._style2//'catmullrom';
        curve.mesh = new THREE.Line( geometry, new THREE.LineBasicMaterial( {
            color: 0xff0000,
            opacity: 0.35
        } ) );


        this.curve=curve;

        this.contAir = new THREE.Object3D();
       // new PlusObj(this.contAir)
       /*this.meshD=new THREE.Mesh(this.par.gSphere, this.par.material);
        this.meshD.scale.set(20,10,1);
        this.contAir.add(this.meshD);*/


        this.par.gltfLoader.load('air3djs/resources/jet/jet.gltf', gltf => {           
            gltf.scene.scale.set(3, 3, 3)
            self.contAir.add(gltf.scene)
        })

        this.content3d.add(this.contAir)


        this.content3d.add(curve.mesh);


        this.arrayPoint=[]

        this.contDebag=undefined;
        this.arrD=[] 
        this.arrD2=[] 

        if(this.debug==true){
            this.contDebag = new THREE.Object3D();
            this.par.contDebag.add(this.contDebag)

            this.arrD[0]=new THREE.Mesh(this.par.gSphere, this.par.material);
            this.arrD[0].scale.set(10,10,10);
            this.contDebag.add(this.arrD[0]);

            this.arrD[1]=new THREE.Mesh(this.par.gSphere, this.par.material);
            this.arrD[1].scale.set(10,10,10);
            this.contDebag.add(this.arrD[1]);

          /*  this.arrD[2]= new THREE.Object3D();
            this.contDebag.add(this.arrD[2]);

            this.arrD[3]=new THREE.Mesh(this.par.gBox, this.par.material1);
            this.arrD[3].scale.set(1,1,1);
            this.arrD[2].add(this.arrD[3]);*/

            


            for (var i = 0; i < this.arrD.length; i++) {
                this.arrD[i].name="arrayDebug_"+i;
            }

            this.contDebag.gObj=this;
            this.par.par.visi3D.addChildMouse(this.contDebag);
        }







        this.dragValue = function(){  
            let t=this._value/100
            let point=curve.getPoint(t)
            let point1=curve.getPoint((t+0.001))
            this.contAir.position.set(point.x, point.y, point.z);
            this.setAir(this.contAir, point, vect3Null)

            var position = geometry.attributes.position;
            let point3=new THREE.Vector3()
            for ( let i = 0; i < ARC_SEGMENTS; i ++ ) {
                let t1 = i / ( ARC_SEGMENTS - 1 );
                if(t1>t)t1=t
                curve.getPoint( t1, point3 );
                position.setXYZ( i, point3.x, point3.y, point3.z );
            }
            position.needsUpdate = true;            
            
        }


        this.setAir = function(c3d, p, p1){ 
            //c3d.up.subVectors(c3d.position, p1)
            c3d.lookAt(p1);
            trace('setAir')
        }



// export class PlusObj  {
//     constructor(obj3d) {  


//         function addPlane() {
//             /*const direction = new THREE.Mesh(
//                 new THREE.SphereGeometry( radius * 0.01, 16, 16 ),
//                 new THREE.MeshBasicMaterial({
//                     color: 0xff0000
//                 })
//             )
//             const down = new THREE.Vector3(0, 0, 0)

//            direction.position.set(rand(-1, 1), rand(-1, 1), rand(-1, 1))
//             direction.position.normalize()
//             direction.position.multiplyScalar(radius)
//             this.content3d.add( direction )
//             const self = this*/

//             //model: https://poly.google.com/view/bgUY8zN2Bq9
//             this.gltfLoader.load(this.resources + 'jet/jet.gltf', gltf => {
//                 const plane = gltf.scene
//                 plane.scale.set(3, 3, 3)
// /*
//                 const d = radius * 0.2
//                 //plane.add(new THREE.AxesHelper( radius * 0.03 ))
//                 plane.position.addVectors(direction.position, new THREE.Vector3(rand(-d, d), rand(-d, d), rand(-d, d)))
//                 plane.position.normalize()
//                 plane.position.multiplyScalar(radius)*/

//                 //setRotationFromPoints(plane, direction.position, down)
//                 obj3d.add( plane )
//             })
//         }

//         addPlane()
//     }
// }









        var vect3Null=new THREE.Vector3()
        var vect3
        this.drag=function(bool){
           
            let distans = calc.getDistance3D(self.position,self.position1);
            let distMin = distans/(self._amountPoints-1);
           
            for (let i = 0; i < self._amountPoints; i++) {
                if(self.arrayPoint[i]==undefined)self.arrayPoint[i]=new THREE.Vector3(0,0,0)
                if(i==0){                   
                    self.arrayPoint[i].set(self.position1.x,self.position1.y,self.position1.z)
                    continue;
                }
                if(i==self._amountPoints-1){                    
                    self.arrayPoint[i].set(self.position.x,self.position.y,self.position.z)
                    continue;
                }

                vect3=getPoint3d(self.position, self.position1,distMin*i);
                self.arrayPoint[i].set(vect3.x,vect3.y,vect3.z);
            }


            let radius = calc.getDistance3D(self.position,vect3Null);
            
            
            if(self._style.indexOf('plus')!=-1){
                for (let i = 1; i < self._amountPoints-1; i++) {
                    let rad = calc.getDistance3D(self.position,vect3Null);
                    vect3=getPoint3d(self.arrayPoint[i],vect3Null,radius+self._sPnum)
                    self.arrayPoint[i]=vect3;
                }
            }


            /////////////////////////////////////////////



            if(curve.points.length!=self._amountPoints){
                let p=[]
                for (let i = 0; i < self._amountPoints; i++) {
                    p[i]=new THREE.Vector3()
                } 
                for (let i = 0; i < self._amountPoints; i++) {
                    p[i].set(self.arrayPoint[i].x,self.arrayPoint[i].y,self.arrayPoint[i].z)
                }             

                curve.points=p;
            }

            for (let i = 0; i < self._amountPoints; i++) {
                curve.points[i].set(self.arrayPoint[i].x,self.arrayPoint[i].y,self.arrayPoint[i].z)
            }

            self.dragValue();



            ///////////////////////////////          


            if(self.debug==true){                             
                self.arrD[0].position.set(self.position.x,self.position.y,self.position.z)
                self.arrD[1].position.set(self.position1.x,self.position1.y,self.position1.z)
               /* self.arrD[2].position.set(self.position1.x,self.position1.y,self.position1.z) 

                self.arrD[2].lookAt( self.arrD[0].position);
                
                self.arrD[3].scale.z=distans;
                self.arrD[3].position.z=distans/2;*/

                
                for (let i = 0; i < self.arrD2.length; i++) {
                    self.arrD2[i].visible=false;
                }

                for (let i = 0; i < self._amountPoints; i++) {
                    if(self.arrD2[i]==undefined){
                        self.arrD2[i]=new THREE.Mesh(self.par.gSphere, self.par.material2);
                        self.arrD2[i].scale.set(2,2,2);
                        self.contDebag.add(self.arrD2[i]);
                    }
                    self.arrD2[i].visible=true
                    self.arrD2[i].position.set(self.arrayPoint[i].x, self.arrayPoint[i].y, self.arrayPoint[i].z)
                }


                for (let i = 0; i < curve.points.length; i++) {
                    if(self.arrD2[i]==undefined){
                        self.arrD2[i]=new THREE.Mesh(self.par.gSphere, self.par.material2);
                        self.arrD2[i].scale.set(2,2,2);
                        self.contDebag.add(self.arrD2[i]);
                    }
                    self.arrD2[i].visible=true
                    self.arrD2[i].position.set(curve.points[i].x, curve.points[i].y, curve.points[i].z)
                }
            }

        }        

        this.position=new PositionFun(0,0,0,this.drag);
        this.position1=new PositionFun(0,0,0,this.drag);
        this.arrayPosit=[this.position, this.position1]
        

        function getPoint3d(p,p1,dist){
            var v=new THREE.Vector3(0,0,0);
            let d=calc.getDistance3D(p,p1);
            let s=dist/d;

            v.x=p.x*s+p1.x*(1-s);
            v.y=p.y*s+p1.y*(1-s);
            v.z=p.z*s+p1.z*(1-s);

            return v;
        }







   

        this.clear = function(){ 

        }

        this.getObj = function(){ 
            var o={}
            o.p={
                x:this.position.x,
                y:this.position.y,
                z:this.position.z
            }
            o.p1={
                x:this.position1.x,
                y:this.position1.y,
                z:this.position1.z
            }
            o.style = this._style;  
            o.style2 = this._style2;
            o.sPnum = this._sPnum;
            o.amountPoints = this._amountPoints;          
            return o
        }


        this.setObj = function(o){ 
            this.clear()            
           
            this._style=o.style;   
            if(o.style2)this._style2=o.style2; 
            if(o.sPnum)this._sPnum=o.sPnum; 
            if(o.amountPoints)this._amountPoints=o.amountPoints; 
            this.position.setPoint(o.p);
            this.position1.setPoint(o.p1);


          
        }





        this.creat = function(p,p1){ 

            this.position.setPoint(p);
            this.position1.setPoint(p1);
            this.drag(true);
        }

    }



    set life(value) {
        if(this._life!=value){
            this._life= value;          

            if(this._life==true){
                this.par.content3d.add(this.content3d)

            }else{
                this.par.content3d.remove(this.content3d)
            }               
        }
            
    }    
    get life() { return  this._life;}



    set style(value) {
        if(this._style!=value){
            this._style= value;
            this.drag()                          
        }
            
    }    
    get style() { return  this._style;}

    set style2(value) {
        if(this._style2!=value){
            this._style2 = value;
            trace(value)
            this.curve.curveType=this._style2
            this.drag()                          
        }
            
    }    
    get style2() { return  this._style2;}

    set amountPoints(value) {
        if(this._amountPoints!=value){
            this._amountPoints= value; 
           
            this.drag()
        }            
    }    
    get amountPoints() { return  this._amountPoints;}


    set sPnum(value) {
        if(this._sPnum!=value){
            this._sPnum= value; 
            this.drag()
        }
            
    }    
    get sPnum() { return  this._sPnum;}

    set value(value) {
        if(this._value!=value){
            this._value= value; 
            this.dragValue()
        }
            
    }    
    get  value() { return  this._value;}



    


}

// export class PlusObj  {
//     constructor(obj3d) {  


//         function addPlane() {
//             /*const direction = new THREE.Mesh(
//                 new THREE.SphereGeometry( radius * 0.01, 16, 16 ),
//                 new THREE.MeshBasicMaterial({
//                     color: 0xff0000
//                 })
//             )
//             const down = new THREE.Vector3(0, 0, 0)

//            direction.position.set(rand(-1, 1), rand(-1, 1), rand(-1, 1))
//             direction.position.normalize()
//             direction.position.multiplyScalar(radius)
//             this.content3d.add( direction )
//             const self = this*/

//             //model: https://poly.google.com/view/bgUY8zN2Bq9
//             this.gltfLoader.load(this.resources + 'jet/jet.gltf', gltf => {
//                 const plane = gltf.scene
//                 plane.scale.set(3, 3, 3)
// /*
//                 const d = radius * 0.2
//                 //plane.add(new THREE.AxesHelper( radius * 0.03 ))
//                 plane.position.addVectors(direction.position, new THREE.Vector3(rand(-d, d), rand(-d, d), rand(-d, d)))
//                 plane.position.normalize()
//                 plane.position.multiplyScalar(radius)*/

//                 //setRotationFromPoints(plane, direction.position, down)
//                 obj3d.add( plane )
//             })
//         }

//         addPlane()
//     }
// }