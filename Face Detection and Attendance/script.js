let video=document.getElementById("video");

let model;
let canvas=document.getElementById("canvas");
let ctx=canvas.getContext("2d")

const setupCamera=()=>{
    navigator.mediaDevices.getUserMedia({
        video:{width:600,height:400},
        audio:false,
        duration:true
    }).then((stream)=>{
        video.srcObject=stream;
    });
};

var detectTime=0;

const detectFaces= async()=>{
    const prediction=await model.estimateFaces(video,false);
    console.log(prediction);
    // console.log("predict hora!!!!")
    console.log(prediction.length)
    var len=prediction.length
    

        if (len==1)
        {
        detectTime+=1;
        // alert("Hello");
        console.log("ssss"+detectTime)
        }
        else
        console.log('No'+detectTime)

           
   

    ctx.drawImage(video,0,0,600,400);
    prediction.forEach((pred)=>{
        ctx.beginPath();
        ctx.lineWidth="4";
        ctx.strokeStyle="skyblue";
        ctx.rect(
            pred.topLeft[0],
            pred.topLeft[1],
            pred.bottomRight[0]-pred.topLeft[0],
            pred.bottomRight[1]-pred.topLeft[1]
        );
        ctx.stroke();

        ctx.fillStyle="red";
        pred.landmarks.forEach(landmark=>{
            ctx.fillRect(landmark[0],landmark[1],5,5)
        })
    });
    
};



setupCamera();

video.addEventListener("loadeddata",async()=>{
    model=await blazeface.load();
    setInterval(detectFaces,1000);
});



