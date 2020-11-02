// const colors = ["rgb(85, 26, 139)", "rgb(54, 69, 79)", "rgb(40, 44, 53)", "rgb(15, 15, 15)", "rgb(0, 51, 102)", "rgb(59, 60, 54)", "rgb(0, 33, 71)", "rgb(52, 52, 52)", "rgb(97, 35, 2)", "rgb(16, 12, 8)", "rgb(61, 43, 31)", "rgb(26, 17, 16)", "rgb(22, 22, 29)", "rgb(61, 12, 2)", "rgb(50, 23, 77)", "rgb(255, 213, 154)", "rgb(2, 0, 1)", "rgb(21, 14, 6)", "rgb(29, 0, 2)", "rgb(173, 223, 173)", "rgb(3, 2, 0)", "rgb(52, 46, 46)", "rgb(11, 10, 8)", "rgb(68, 77, 86)", "rgb(119, 118, 114)", "rgb(13, 12, 10)", "rgb(2, 4, 3)", "rgb(1, 3, 2)", "rgb(18, 3, 33)", "rgb(74, 75, 70)", "rgb(3, 2, 0)", "rgb(11, 7, 4)", "rgb(26, 34, 40)", "rgb(5, 5, 5)", "rgb(2, 4, 3)", "rgb(78, 75, 74)", "rgb(59, 60, 54)", "rgb(30, 39, 44)", "rgb(77, 75, 80)", "rgb(17, 34, 34)", "rgb(54, 43, 50)", "rgb(91, 78, 75)", "rgb(25, 68, 60)", "rgb(168, 28, 7)", "rgb(86, 83, 80)", "rgb(51, 51, 51)", "rgb(17, 0, 17)", "rgb(38, 35, 53)", "rgb(70, 70, 71)", "rgb(70, 61, 62)"]


// function getHex(color){
//     let rgb = color.match(/[0-9]+/g);
//     return "#" + rgb.map(e=>{return (+e).toString(16).padStart(2, '0')}).join("");
// }
// const hexes = colors.map(getHex);

// let root = document.getElementById("root");

// for(let i = 0; i < colors.length; i++){
//     for(let j = 0; j < colors.length; j++){
//         let div = document.createElement("div");
//         const deg = 135;
//         const bg = `linear-gradient(${deg}deg, ${hexes[i]}, ${hexes[j]})`
//         div.className = "bg";
//         div.style.background = bg;
//         div.innerHTML = "background: " + bg + ";";
//         root.appendChild(div);
//     }
// }


/*****************************************************************************
*                                                                            *
*  SVG Path Rounding Function                                                *
*  Copyright (C) 2014 Yona Appletree                                         *
*                                                                            *
*  Licensed under the Apache License, Version 2.0 (the "License");           *
*  you may not use this file except in compliance with the License.          *
*  You may obtain a copy of the License at                                   *
*                                                                            *
*      http://www.apache.org/licenses/LICENSE-2.0                            *
*                                                                            *
*  Unless required by applicable law or agreed to in writing, software       *
*  distributed under the License is distributed on an "AS IS" BASIS,         *
*  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.  *
*  See the License for the specific language governing permissions and       *
*  limitations under the License.                                            *
*                                                                            *
*****************************************************************************/

/**
 * SVG Path rounding function. Takes an input path string and outputs a path
 * string where all line-line corners have been rounded. Only supports absolute
 * commands at the moment.
 * 
 * @param pathString The SVG input path
 * @param radius The amount to round the corners, either a value in the SVG 
 *               coordinate space, or, if useFractionalRadius is true, a value
 *               from 0 to 1.
 * @param useFractionalRadius If true, the curve radius is expressed as a
 *               fraction of the distance between the point being curved and
 *               the previous and next points.
 * @returns A new SVG path string with the rounding
 */


function roundPathCorners(pathString, radius, useFractionalRadius) {
    function moveTowardsLength(movingPoint, targetPoint, amount) {
      var width = (targetPoint.x - movingPoint.x);
      var height = (targetPoint.y - movingPoint.y);
      
      var distance = Math.sqrt(width*width + height*height);
      
      return moveTowardsFractional(movingPoint, targetPoint, Math.min(1, amount / distance));
    }
    function moveTowardsFractional(movingPoint, targetPoint, fraction) {
      return {
        x: movingPoint.x + (targetPoint.x - movingPoint.x)*fraction,
        y: movingPoint.y + (targetPoint.y - movingPoint.y)*fraction
      };
    }
    
    // Adjusts the ending position of a command
    function adjustCommand(cmd, newPoint) {
      if (cmd.length > 2) {
        cmd[cmd.length - 2] = newPoint.x;
        cmd[cmd.length - 1] = newPoint.y;
      }
    }
    
    // Gives an {x, y} object for a command's ending position
    function pointForCommand(cmd) {
      return {
        x: parseFloat(cmd[cmd.length - 2]),
        y: parseFloat(cmd[cmd.length - 1]),
      };
    }
    
    // Split apart the path, handing concatonated letters and numbers
    var pathParts = pathString
      .split(/[,\s]/)
      .reduce(function(parts, part){
        var match = part.match("([a-zA-Z])(.+)");
        if (match) {
          parts.push(match[1]);
          parts.push(match[2]);
        } else {
          parts.push(part);
        }
        
        return parts;
      }, []);
    
    // Group the commands with their arguments for easier handling
    var commands = pathParts.reduce(function(commands, part) {
      if (parseFloat(part) == part && commands.length) {
        commands[commands.length - 1].push(part);
      } else {
        commands.push([part]);
      }
      
      return commands;
    }, []);
    
    // The resulting commands, also grouped
    var resultCommands = [];
    
    if (commands.length > 1) {
      var startPoint = pointForCommand(commands[0]);
      
      // Handle the close path case with a "virtual" closing line
      var virtualCloseLine = null;
      if (commands[commands.length - 1][0] == "Z" && commands[0].length > 2) {
        virtualCloseLine = ["L", startPoint.x, startPoint.y];
        commands[commands.length - 1] = virtualCloseLine;
      }
      
      // We always use the first command (but it may be mutated)
      resultCommands.push(commands[0]);
      
      for (var cmdIndex=1; cmdIndex < commands.length; cmdIndex++) {
        var prevCmd = resultCommands[resultCommands.length - 1];
        
        var curCmd = commands[cmdIndex];
        
        // Handle closing case
        var nextCmd = (curCmd == virtualCloseLine)
          ? commands[1]
          : commands[cmdIndex + 1];
        
        // Nasty logic to decide if this path is a candidite.
        if (nextCmd && prevCmd && (prevCmd.length > 2) && curCmd[0] == "L" && nextCmd.length > 2 && nextCmd[0] == "L") {
          // Calc the points we're dealing with
          var prevPoint = pointForCommand(prevCmd);
          var curPoint = pointForCommand(curCmd);
          var nextPoint = pointForCommand(nextCmd);
          
          // The start and end of the cuve are just our point moved towards the previous and next points, respectivly
          var curveStart, curveEnd;
          
          if (useFractionalRadius) {
            curveStart = moveTowardsFractional(curPoint, prevCmd.origPoint || prevPoint, radius);
            curveEnd = moveTowardsFractional(curPoint, nextCmd.origPoint || nextPoint, radius);
          } else {
            curveStart = moveTowardsLength(curPoint, prevPoint, radius);
            curveEnd = moveTowardsLength(curPoint, nextPoint, radius);
          }
          
          // Adjust the current command and add it
          adjustCommand(curCmd, curveStart);
          curCmd.origPoint = curPoint;
          resultCommands.push(curCmd);
          
          // The curve control points are halfway between the start/end of the curve and
          // the original point
          var startControl = moveTowardsFractional(curveStart, curPoint, .5);
          var endControl = moveTowardsFractional(curPoint, curveEnd, .5);
    
          // Create the curve 
          var curveCmd = ["C", startControl.x, startControl.y, endControl.x, endControl.y, curveEnd.x, curveEnd.y];
          // Save the original point for fractional calculations
          curveCmd.origPoint = curPoint;
          resultCommands.push(curveCmd);
        } else {
          // Pass through commands that don't qualify
          resultCommands.push(curCmd);
        }
      }
      
      // Fix up the starting point and restore the close path if the path was orignally closed
      if (virtualCloseLine) {
        var newStartPoint = pointForCommand(resultCommands[resultCommands.length-1]);
        resultCommands.push(["Z"]);
        adjustCommand(resultCommands[0], newStartPoint);
      }
    } else {
      resultCommands = commands;
    }
    
    return resultCommands.reduce(function(str, c){ return str + c.join(" ") + " "; }, "");
  }
  
  const path = "M 0 512 L 512 512 L 512 0 L 0 64 Z"

  const res = roundPathCorners(path, 32, false);
  console.log(`d="${res}"`)