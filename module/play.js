import * as map from "./map.js";

export function playerMove(direction){
    var playerPoint = getPlayerPoint();
    //得到玩家下一个位置的信息
    var nextInfo = getNextInfo(playerPoint.row,playerPoint.col,direction)
    //什么情况下不能移动
    if(nextInfo.value===map.WALL){
        return false;
    }
    //能移动
    if(nextInfo.value===map.SPACE){
        //下一个位置是空白
        exchange(playerPoint,nextInfo);
        return true;
    }
    else{
        //下一个位置是箱子
        //获取箱子的下一个位置
        var nextNextInfo = getNextInfo(nextInfo.row,nextInfo.col,direction);
        if(nextNextInfo.value===map.SPACE){
            exchange(nextInfo,nextNextInfo);
            exchange(playerPoint,nextInfo);
            return true;
        }else{
            return false;
        }
    }
}

//根据当前地图内容，判断游戏是否胜利
export function isWin(){
    for(var i = 0; i < map.correct.length; i++){
        var point = map.correct[i];
        if(map.content[point.row][point.col]!==map.BOX){
            return false;
        }
    }
    return true;
}
function exchange(point1,point2){
    var temp = map.content[point1.row][point1.col];
    map.content[point1.row][point1.col] = map.content[point2.row][point2.col];
    map.content[point2.row][point2.col] = temp;
}

//获取玩家位置
function getPlayerPoint(){
    for(var row = 0;row < map.rowNumber; row++){
        for(var col = 0 ;col < map.colNumber; col++){
            if(map.content[row][col]===map.PLAYER){
                return{
                    row: row,
                    col: col
                }
            }
        }
    }
}
//得到某个位置上在指定方向上的下一个位置信息
function getNextInfo(row,col,direction){
    if(direction==='left'){
        return{
            row: row,
            col: col - 1,
            value: map.content[row][col-1]
        }
    }else if(direction==='right'){
        return{
            row: row,
            col: col + 1,
            value: map.content[row][col+1]
        }
    }else if(direction==='up'){
        return{
            row: row - 1,
            col: col,
            value: map.content[row-1][col]
        }
    }else if(direction==='down'){
        return{
            row: row + 1,
            col: col,
            value: map.content[row+1][col]
        }
    }
}