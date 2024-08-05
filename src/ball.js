import { randomInteger } from "./utilities";

class Ball {

    app = null;

    textbox = null;

    ball = null;

    animationComplete = true;

    data = null;

    currentText = null;

    constructor(data) {
        this.app = new PIXI.Application();
        this.onClick = this.onClick.bind(this);
        this.data = data;
    }

    async init(params, $ref){
        await this.app.init(params);
        $ref.appendChild(this.app.canvas);
    }

    async loadTextures({height: heightContainer, width: widthContainer}){
        const textureGround = await PIXI.Assets.load('/cartoon_grass_texture.png');
        const textureGrass = await PIXI.Assets.load("/grass_for_top.png");

        //Земля
        for(let i = 0; i < 6; i++) {
            const sprite = new PIXI.Sprite(textureGround);
            sprite.width = 300;
            sprite.height = 300;
            sprite.x = sprite.width * i;
            sprite.y = heightContainer - sprite.height;
            this.app.stage.addChild(sprite);
        }

        //Трава
        for(let i = 0; i < 5; i++) {
            const sprite = new PIXI.Sprite(textureGrass);
            sprite.width = 340;
            sprite.x = sprite.width * i;
            sprite.y = heightContainer - sprite.height / 2 - 320;
            this.app.stage.addChild(sprite);
        }

        const textureTextbox = await PIXI.Assets.load("/textbox2.png");
        const spriteOftextbox = new PIXI.Sprite(textureTextbox);
        spriteOftextbox.scale = 0.6;

        //Контейнер для текста и спрайта текстбокса

        const Container = new PIXI.Container();
        Container.addChild(spriteOftextbox);
        Container.x = widthContainer - Container.width - 10;
        Container.y = heightContainer - Container.height - 10;
        
        this.app.stage.addChild(Container);
        this.textbox = Container;

        //Первоначальный текст

        const currentData = this.getCurrentData();
        this.setText(currentData.title)

        //Мячик

        const textureBall = await PIXI.Assets.load("/soccer_ball.svg");
        const spriteOfBall = new PIXI.Sprite(textureBall);
        spriteOfBall.width = 150;
        spriteOfBall.height = 150;
        spriteOfBall.anchor.set(0.5, 1);
        spriteOfBall.x = (widthContainer - spriteOfBall.width) / 2;
        spriteOfBall.y = heightContainer - spriteOfBall.height / 2;

        spriteOfBall.eventMode = 'static';
        spriteOfBall.cursor = 'pointer';
        spriteOfBall.on('click', this.onClick);
        
        
        this.app.stage.addChild(spriteOfBall);
        this.ball = spriteOfBall;
    }

    onClick() {
        if(!this.animationComplete)
            return; 
        this.animationComplete = false;

        const currentData = this.getCurrentData();

        const ballDefaultScale = 0.733;

        const timeline = gsap.timeline({onComplete: () =>  {
            this.animationComplete = true;
            this.setText(currentData.title);
            }
        });

        const commonDuration = 1.5;

        timeline.to(this.ball, {pixi: {y: this.ball.y - 400 }, duration: commonDuration * 0.5, ease: "power1.out" })
                .to(this.ball, {pixi: {y: this.ball.y}, duration: commonDuration * 0.5, ease: "power1.in" }, '>')

                .to(this.ball, {pixi: {scaleX: ballDefaultScale * 0.8, scaleY: ballDefaultScale * 1.2}, duration: commonDuration * 0.1333 }, 0)
                .to(this.ball, {pixi: {scaleX: ballDefaultScale, scaleY: ballDefaultScale}, duration: commonDuration * 2.666 }, 0.4)
                .to(this.ball, {pixi: {scaleX: ballDefaultScale * 0.8, scaleY: ballDefaultScale * 1.2}, duration: commonDuration * 2.666, ease: "power1.inOut" }, '>-0')
                .to(this.ball, {pixi: {scaleX: ballDefaultScale * 1.2, scaleY: ballDefaultScale * 0.8}, duration: commonDuration * 0.2 }, 1.40)
                .to(this.ball, {pixi: {scaleX: ballDefaultScale, scaleY: ballDefaultScale}, duration: commonDuration * 0.1333 }, '>')
    }

    getCurrentData() {
        const currentIndex = randomInteger(0, this.data.length - 1);
        const currentData = this.data[currentIndex];
        
        this.data.length > 1 && (this.data = this.data.filter((item) => item.id !== currentData.id));

        return currentData;
    }

    async setText(text) {
        if(this.currentText) {
            this.currentText.destroy();
        }

        const font = await PIXI.Assets.load("/arcade_classic.TTF");
        const FontText = new PIXI.Text({
            text,
            style: {
                fontFamily: font.family,
                fontSize: 30,
                fill: "#000000",
                align: 'center',
                wordWrap: true,
                wordWrapWidth: 380,
            }
        });
        FontText.x = (this.textbox.width - FontText.width) / 2;
        FontText.y = (this.textbox.height - FontText.height) / 2;
        this.textbox.addChild(FontText);
        this.currentText = FontText;
    }
}

export default class Singleton {
    static instance = null;
    static isSecond = false;

    constructor(data) {
        if(Singleton.instance) {
            Singleton.isSecond = true;
            return this;
        }
        Singleton.instance = new Ball(data);
    }

    getInstance() {
        if(Singleton.isSecond)
            return null;
        return Singleton.instance;
    }
}