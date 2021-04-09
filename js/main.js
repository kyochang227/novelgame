'use strict';

    let canvas = document.getElementById('myCanvas'); //canvas作成
    let ctx = canvas.getContext('2d');

    let changeFlg=true;　//ボタンクリック時の処理　初期値はtrueとする
    let sentenceIndex=0; 
    let voicesIndex = 0;
    let text; //宣言のみ 後ほど定義
    let bgmflg=true; //bgm 初期値true=停止
    
    const voices = [　//ボイス配列　初期値は0
        "audio/腹の音.mp3",　//ここからスタート 1←セリフと一致させるための番号
        "audio/あぁ.wav",
        "audio/痛い.wav",
        "audio/無音.mp3",
        "audio/無音.mp3", //5
        "audio/無音.mp3",
        "audio/無音.mp3",
        "audio/無音.mp3",
        "audio/無音.mp3",
        "audio/ちょっと.wav", //10
        "audio/無音.mp3",
        "audio/おい.wav",
        "audio/無音.mp3",
        "audio/ふざけんな.wav",
        "audio/無音.wav",//15
        "audio/ふん.wav",
        "audio/ふざけんな.wav",
        "audio/ちくしょう.wav",
        "audio/無音.mp3",
        "audio/ぶっころ.wav",//20
        "audio/腹の音.mp3",
        "audio/あぁ.wav",
        "audio/おぉーーーー.wav",
        "audio/無音.mp3",
        "audio/ふー.wav",//25
        "audio/無音.mp3",
        "audio/無音.mp3",
        "audio/無音.mp3",
        "audio/無音.mp3",
        "audio/無音.mp3",//30
        "audio/無音.mp3",
        "audio/無音.mp3",
        "audio/無音.mp3",
        "audio/無音.mp3",
        "audio/無音.mp3",//35
        "audio/やっべー.wav",
        "audio/いけるぞ.wav",
        "audio/そうだろ.wav",
        "audio/おぉーーーー.wav",
        "audio/あ.wav",//40
        "audio/無音.mp3",
        "audio/無音.mp3",
        "audio/すいません.wav",
        "audio/無音.mp3",
        "audio/無音.mp3",//45
        "audio/無音.mp3",
        "audio/無音.mp3",
        "audio/無音.mp3",
        "audio/おはよう.wav",//49
    ];
    
    const sentences = [ //セリフ配列 初期値は0
        "",//初期表示
        "ぐ～～!!",//ここからスタート 1
        "あぁ～!!",
        "いてーーーー!",
        "ここは雪の町　札幌",
        "とある駅のトイレでもがき苦しんでる青年がいた。",//5
        "その青年の名前は逸見京平(へんみきょうへい)",
        "23歳で職業訓練学校に通いながら就職活動を行っている。",
        "今日は彼が制作していたjavascriptの成果物の発表だ。発表事の度にお腹を壊す天才である。",
        "顔は至って地味、身長は平凡、これといったスキルもない...モテない男の特徴を見事にそろえたその姿には目も当てられない。",
        "ちょっと…ナレーションさん!?",//10
        "犬には餌をくれる都合のいい奴として利用される始末。",
        "おい…",
        "物事の習得スピードは亀の如し、所詮この程度のおと…",
        "誰が所詮この程度の男じゃー!!!!",
        "はい？",//15
        "さっきから人の個人情報ペラペラ喋りやがって!!しかも途中から完全にお前の偏見じゃん!!!",
        "お前はナレーターだろ!?俺がやったことだけ説明しろ!!",
        "確かに俺の習得スピードは亀だが、習得への執着は獲物を狩るライオン並だ!!理解するまで絶対逃げないし、粉々に噛み砕いて吸収してやるからな!!",
        "スミマセン　ヨクキコエマセン",
        "SIR〇か!!ぶっこ...",//20
        "ぐ～～",
        "あぁ...てか邪魔するな!集中してんだから",
        "おぉーーーーーーーーーーーーー!!",
        "京平はライオン顔負けの雄叫びを上げ、体の異物を排除した。なんとも可愛らしい獣だ。",
        "ふぅ～",//25
        "京平は安堵の息を吐き、トイレを後にした。",
        "改札を通り、階段を上ると対向車線わきに目的地である学校が姿を現した。",
        "そして京平の真横にはカラスとカモが支配する帝国　中島公園がある。",
        "威嚇するカラスを横目に信号を渡り、建物に入ると多くの人々がいた。",
        "ここでは毎朝恒例の戦争が繰り広げられている。",//30
        "そう...エレベーター争奪戦だ。",
        "京平はしょっていたカバンを下ろし、手で持ち上げた。",
        "多くの人が入る為、スペースが狭く背中にしょっていると邪魔になるためである。",
        "5階のボタンを押し、エレベーターは上階へ向かった。",
        "いつもは何も考えない京平であったが、今日は違った。",//35
        "(失敗したらどうしよう...いや..俺ならいける...)",
        "(ここで自分を信じなきゃ、今日まで頑張って制作してた俺に申し訳ないもんな)",
        "(そうだろ...京平...)",
        "おぉーーーーーーーーーーーーーー!!",
        "あ...",//40
        "我に返るとエレベーター内の人々全員が京平を睨んでいた。",
        "どうやら心の声が外に漏れていたようだ。",
        "すいません...",
        "京平は俯きながら謝罪した。",
        "5階に着くと京平はエレベータを降り、天に祈りを捧げた。",//45
        "今一緒に乗った人々に二度と会いませんようにと。",
        "廊下を歩き、右に行くと教室の扉が見えた。",
        "扉を開けた先に彼はいた。",
        "おはようございます!!加藤さん"//49
        ];
    
    canvas.addEventListener('click',function(){ //ボタンをクリックした時の処理
        if(changeFlg){
            changeFlg=false; //操作不能
            setTimeout(function(){　
                changeFlg=true;
            },1500);　//1.5秒後にture

            update();
            voiceStart();
        }
    });
       
    var Loader = function(expectedCnt,callback) { //expectendCntは画像枚数が期待されるカウント
        let cnt=0;
        return function() {
            cnt++;
            if(cnt == expectedCnt) {
                callback();
            }
        }
    }
    
    var loader=Loader(3,function() { //expectedCnt=3 背景、人物、メッセージボックスの読み込み完了後、表示処理
        update();
    });

    function update(){ //表示処理
        ctx.clearRect(0,0,canvas.width,canvas.height); //canvas内のコンテンツをリセット
    
        if(sentenceIndex>sentences.length-1){ //セリフが最後まで行った時の処理
            bgImage.render();
            alert('to be continued...');
            location.reload(); //ブラウザを更新
        } else {
            bgImage.render(); //背景を表示
            personImage.render(); //人物を表示
            messageBox.render(); //メッセージボックスを表示
    
            myText.render(text=sentences[sentenceIndex]);
            sentenceIndex++;
        }
    }

    bgm(); //bgmをボタン操作でON/OFF

    function voiceStart(){ //音声再生　クリックするたびに次の音声へ
        const voice = new Audio(voices[voicesIndex]);
        voice.play(); //声を再生
        voice.volume=1; //声の音量
        voicesIndex++;//インデックス値を増やす
    }

    function bgm(){
        const bgmswitch=document.getElementById('bgmswitch'); //htmlのbuttonを取得
        const bgm=new Audio('bgm/MusMus-BGM-086.mp3'); //bgm取得
        bgm.loop=true; //曲が終わったら最初から再生

        bgmswitch.addEventListener('click',()=>{ //ボタン操作にてBGMを流す/消す
            if(bgmflg){ //停止の場合
                bgmflg=false;
                bgm.play(); //bgmを再生
                bgm.volume=0.2; //bgmの音量
                bgmswitch.value='OFF'; //表示をOFFに変更
            } else {
                bgmflg=true;
                bgm.pause(); //bgmを停止
                bgmswitch.value='ON'; //表示をONに変更
            }
        });
    }
    
    var bgImage=new function() { //this=bigImage 背景を表示
        this.x=0;
        this.y=0;
    
        this.width=canvas.width; //canvasのwidthと同値
        this.height=canvas.height; //canvasのheightと同値
    
        this.loadImage=function(){
            this.image=new Image();
            this.image.src='images/中島公園.jpg';
            this.image.onload=loader; //loaderを参照 
        }
    
        this.render=function() {    
            ctx.drawImage(this.image,this.x,this.y,this.width,this.height);
        }
    }
    
    var personImage=new function() { //this=personImage　人物を表示
        this.y=0;
    
        this.loadImage=function(){
            this.image=new Image();
            this.image.src='images/アフロくん.png';
            this.image.onload=loader; //loaderを参照 
        }
    
    
        this.render=function(){
    
            this.aspect =　this.image.width / this.image.height;
    
            this.width=canvas.width * this.aspect;
            this.height=canvas.height;
        
            this.x=canvas.width / 2 - this.width / 2;
    
            ctx.drawImage(this.image,this.x,this.y,this.width,this.height);
    
        }
    }
    
    
    var messageBox=new function() { //this=messageBox
        this.x=0;
    
        this.loadImage=function(){
            this.image=new Image();
            this.image.src='images/box_blue_name.png';
            this.image.onload=loader; //loaderを参照 
        }
    
        this.render=function() { //メッセージボックス 
            this.aspect =　this.image.width / this.image.height;
    
            this.width=canvas.width;
            this.height=canvas.height / this.aspect;
        
            this.marginBottom=20;
            this.y=canvas.height - this.height - this.marginBottom;
          
            ctx.drawImage(this.image,this.x,this.y,this.width,this.height);
        }
    }
    
    let myText=new function(){ //セリフ処理
        
        this.render=function() { //セリフの改行処理
            let messageBoxInnerWidth = messageBox.width - 50;
            let messageBoxPaddingTop = 40;
            let messageBoxPaddingLeft = 10;
        
            let s = ""; //セリフの1文字
            let sentenceArray = text.split(''); //セリフを1文字ずつ配列化
        
            let kaigyouHeight = 0; //改行時の文章と文章の幅　初期値を0とする
        
            for (var i = 0; i < sentenceArray.length; i++) {
                let textWidth = ctx.measureText(s).width;
                s += sentenceArray[i]; //1文字ずつ追加
        
                if(messageBoxInnerWidth < textWidth) { //テキストの横幅がメッセージボックスの横幅を超えた場合
                    ctx.fillText(s, messageBoxPaddingLeft, messageBox.y + kaigyouHeight + messageBoxPaddingTop);
                    
                    kaigyouHeight += 20; //改行時の文章と文章の幅を20増加させる
                    s="";
                }
            }
    
            ctx.fillStyle = '#fff'; //文字の色
            ctx.font = '16px serif'; //文字のサイズ
            ctx.textAlign = 'left'; //文字の表示位置
        
            ctx.fillText(s, messageBoxPaddingLeft, messageBox.y + kaigyouHeight + messageBoxPaddingTop);
        
        }
    }
    
    bgImage.loadImage(); //背景画像読み込み
    personImage.loadImage(); //人物画像読み込み
    messageBox.loadImage(); //メッセージボックス画像読み込み
        

