
function GalleryXZ(dCont, _x, _y, _fun) {
    DGallery.call(this, dCont, _x, _y, _fun);
               
    this.type="GalleryXZ";
   

    this.createZamen=function(){            
        var r=new BoxXZ(this.content, 0, 0, this.downBtn);            
        return r;
    }




    
}
GalleryXZ.prototype = Object.create(DGallery.prototype);
GalleryXZ.prototype.constructor = GalleryXZ;

Object.defineProperties(GalleryXZ.prototype, {

    index: {// Активный элемент
        set: function (value) {
            
            if (this.array[value] != undefined) {
                this.korektPoIndex(value);
            }
            
            this._index = value;
           

            for (var i = 0; i < this.array.length; i++) {
                if (this._index == i) this.array[i].activ = true;
                else this.array[i].activ = false;
            }

        },
        get: function () {
            return this._index;
        }
    },
})







function BoxXZ(dCont, _x, _y, _fun) {
    DBox.call(this, dCont, _x, _y, _fun);
    this.type = 'BoxXZ';
    var self=this
    this.startLoad = function (_obj) {
        this.object = _obj;
        var link=aGlaf.resursData+""+_obj.id+"/64.png"+aGlaf.plusLink
       
        if(_obj.title!=undefined){
            this.label.visible=true
            this.label.text=_obj.title
            this.label.div.style.pointerEvents="none";
            this.label.fontSize=10;
        }
        
        
        this.image.visible = true;
        if (this.image.link == link) {
            if (self.funLoad) self.funLoad();
           
        } else {
            this.image.width = 100;
            this.image.height = 100;
            this.image.link = link;

        }
       
        this.draw();
    };

    this.draw = function () {
        ss = (this._width - this._otstup * 2) / this.image.picWidth;
        if (ss > (this._height - this._otstup * 2) / this.image.picHeight)ss = (this._height - this._otstup * 2) / this.image.picHeight;
        this.image.x = 0;
        this.image.width=this.image.picWidth*ss;
        this.image.height=this.image.picHeight*ss;

        this.image.x = (this._width - this.image.picWidth * ss) / 2;
        this.image.y = (this._height - this.image.picHeight * ss) / 2;

        this.label.x = 2//(this._width - this.label.curW) / 2;
        this.label.y = this._height - 11;

        if (this.postDraw) this.postDraw();
    };

}
BoxXZ.prototype = Object.create(DBox.prototype);
BoxXZ.prototype.constructor = BoxXZ;









