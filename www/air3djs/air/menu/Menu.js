



/*



import { Home } from './floor/Home.js';

import { MVisi3D } from '../libMy/visi3D/MVisi3D.js';
import { SceneSB } from '../libMy/visi3D/SceneSB.js';

import { Grid } from './fManager/Grid.js';


*/

import { MenuUp } from './MenuUp.js';
import { MenuCreat } from './MenuCreat.js';
import { MenuTraject } from './MenuTraject.js';


export class Menu  {
  	constructor(main) {  		
  		this.type="Menu";
        this.par=main
  		var self=this;
        
        this.mobile = this.par.mobile;


        this.debug = this.par.debug;
        this.wh=50;
        this.otstup=10;
        this.wMenu=220;

        this._radius=500;
        this.dCont=new DCont(this.par.par.contentHTML); 

        this.array=[]
        this.array[0]=this.menuUp=new MenuUp(this);        

        this.array[1]=this.menuCreat=new MenuCreat(this);
        this.array[2]=this.menuTraject=new MenuTraject(this);






		this.upDate = function () {
            this.menuCreat.upDate()
		      
		}



      
  		this.sizeWindow = function(w,h,s){            
            for (let i = 0; i < this.array.length; i++) {
                if(this.array[i].sizeWindow)this.array[i].sizeWindow(w,h,s);
            }

  		}

  	}

    


    /*
    set id(value) {
        if(this._id!=value){
            this._id= value;
        }
    }    
    get id() { return  this._id;}*/




}
