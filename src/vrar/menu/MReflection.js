



export default class MReflection {
    constructor(par, fun, idArr) {
        this.type = "MReflection";
        this.par = par
        this.fun = fun
        this.idArr = idArr
        this.otstup = this.par.otstup;

        this.wh = this.par.wh;
        this.width = 222;

        this._active = false;


        this.button = new DButton(par.panel, this.otstup + idArr * (this.otstup + 100), this.otstup, this.type, s => {
            this.fun("index", this.idArr)
        })





        this.dCont = new DCont(par.dCont);
        this.dCont.y = this.wh + this.otstup * 4;
        this.dCont.x = this.otstup;
        this.dCont.visible = this._active

        this.window = new DWindow(this.dCont, 0, 0, this.type);
        this.window.width = this.width;
        this.window.hasMinimizeButton = false;
        this.window.dragBool = false;

        let offsetY = 32
        this.renderCheckbox = new DCheckBox(this.window, this.otstup, offsetY, 'Render', () => {
            this.obj.active = this.renderCheckbox.value
        })
        offsetY += this.renderCheckbox.height + this.otstup

        this.resolution = 64
        this.resolutionLabel = new DLabel(this.window, this.otstup, offsetY, `Resolution: ${this.resolution}`)
        this.resolutionLabel.width = this.window.width - this.otstup * 2
        offsetY += this.resolutionLabel.height + this.otstup

        const resolutionSliderStep = 16
        this.resolutionSlider = new DSlider(this.window, this.otstup, offsetY, () => {
            this.resolution = Math.round(this.resolutionSlider.value / resolutionSliderStep) * resolutionSliderStep
            this.resolutionLabel.text = `Resolution: ${this.resolution}`
            this.obj.resolution = this.resolution
        })
        this.resolutionSlider.width = this.window.width - this.otstup * 2
        this.resolutionSlider.min = 16
        this.resolutionSlider.max = 1024
        offsetY += this.resolutionSlider.height + this.otstup


        this.renderPeriod = 1
        this.renderPeriodLabel = new DLabel(this.window, this.otstup, offsetY,
            `Render every ${ordinalNumber(this.renderPeriod)}frame`)
        this.renderPeriodLabel.width = this.window.width - this.otstup * 2
        offsetY += this.renderPeriodLabel.height + this.otstup

        this.renderPeriodSlider = new DSlider(this.window, this.otstup, offsetY, () => {
            this.renderPeriod = Math.round(this.renderPeriodSlider.value)
            this.renderPeriodLabel.text = `Render every ${ordinalNumber(this.renderPeriod)}frame`
            this.obj.renderPeriod = this.renderPeriod
        })
        this.renderPeriodSlider.width = this.window.width - this.otstup * 2
        this.renderPeriodSlider.min = 1
        this.renderPeriodSlider.max = 16
        offsetY += this.renderPeriodSlider.height + this.otstup

        this.window.height = offsetY

        this.mAdditional = new MAdditional(this)
    }

    setObject(obj) {
        this.obj = obj
    }

    sizeWindow(w, h, s) {
        // this.dCont.x = w/s - this.width - this.otstup
    }

    set active(value) {
        if (this._active != value) {
            this._active = value;
            this.dCont.visible = this._active;
            this.mAdditional.active = this._active

            if (this._active == false) this.button.color = dcmParam.color;
            else this.button.color = dcmParam.activButton;
        }
    }

    get active() { return this._active; }

}

export class MAdditional {
    constructor(par) {
        this.type = "MAdditional";
        this.par = par
        this.otstup = this.par.otstup;

        this.wh = this.par.wh;
        this.width = 222;

        this._active = false;

        this.dCont = new DCont(par.par.dCont);
        this.dCont.y = this.wh + this.otstup * 4;
        this.dCont.x = this.otstup;
        this.dCont.visible = this._active

        this.window = new DWindow(this.dCont, 0, this.par.window.height + this.otstup, this.type);
        this.window.width = this.width;
        this.window.hasMinimizeButton = false;
        this.window.dragBool = false;

        let offsetY = 32
        this.object1Checkbox = new DCheckBox(this.window, this.otstup, offsetY, 'Render first object', () => {
            this.obj.setVisible(0, this.object1Checkbox.value)
        })
        this.object1Checkbox.value = true
        offsetY += this.object1Checkbox.height + this.otstup

        this.object2Checkbox = new DCheckBox(this.window, this.otstup, offsetY, 'Render second object', () => {
            this.obj.setVisible(1, this.object2Checkbox.value)
        })
        this.object2Checkbox.value = true
        offsetY += this.object2Checkbox.height + this.otstup

        this.window.height = offsetY
    }

    set active(value) {
        if (this._active != value) {
            this._active = value;
            this.dCont.visible = this._active;
        }
    }
    get active() { return this._active; }

    setObject(obj) {
        this.obj = obj
    }
}

function ordinalNumber(n) {
    switch(n) {
        case 1:
            return ''
        case 2:
            return '2nd '
        case 3:
            return '3rd '
        default:
            return n + 'th '
    }
}