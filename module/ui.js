//将地图显示到页面上
import * as map from "./map.js";

var divContainer = document.getElementById('game');
var pieceWidth = 45; // 每一个小方块的宽度
var pieceHeight = 45; //每一个小方块的高度

function setDivContainer(){
    divContainer.style.width = map.colNumber * pieceWidth + 'px';
    divContainer.style.height = map.rowNumber * pieceHeight + 'px';
}
//判断该行该列是否为正确位置
function isCorrect(row,col){
    for(var i = 0; i < map.correct.length;i++){
        var point = map.correct[i];
        if(point.row===row&&point.col===col){
            return true;
        }
    }
    return false;
}

function setOnePiece(row,col){
    var value = map.content[row][col];
    var div = document.createElement('div');
    div.className = 'item';
    divContainer.appendChild(div);
    //调整div的位置
    div.style.left = pieceWidth * col + 'px';
    div.style.top = pieceHeight * row + 'px';
    if(value===map.PLAYER){
        div.classList.add('player')
    }else if(value===map.WALL){
        div.classList.add('wall')

    }else if(value===map.BOX){
        if(isCorrect(row,col)){
            div.classList.add('greenbox')
        }else{
            div.classList.add('box')
        }
    }else{
        if(isCorrect(row,col)){
            div.classList.add('green')
        }else{
            return;//空白
        }
    }
}
function setContent(){
    //清空容器
    divContainer.innerHTML = '';
    //遍历地图内容，设置元素
    for(var row = 0;row < map.rowNumber; row++){
        for(var col = 0 ;col < map.colNumber; col++){
            setOnePiece(row,col);
        }
    }
}
//显示地图
export default function(){
    //设置div的宽高
    setDivContainer();
    //显示地图中的内容
    setContent();
}