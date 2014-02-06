define([
  // Include MathJax from CDN (for now, otherwise +32MB)
  'http://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML',
  // Include JSXGraph (locally, small, 511KB)
  '../../js/jsxgraphcore',
  // Include Wolfram CDF Player
  'http://www.wolfram.com/cdf-player/plugin/v2.1/cdfplugin.js',
  // Processing.js 
  '../../js/processing-1.4.1.min'
], function(){
  MathJax.Hub.Config({
    extensions: ["tex2jax.js"],
    jax: ["input/TeX", "output/HTML-CSS"],
    tex2jax: {
      inlineMath: [ ['$','$'], ["\\(","\\)"] ],
      displayMath: [ ['$$','$$'], ["\\[","\\]"] ],
      processEscapes: true
    },
    "HTML-CSS": { availableFonts: ["TeX"] }
  });

  // Important pentru că ține pătrat box-ul în care apare graphul pornind de la lățimea părintelui.
  var $boxes = $('.jxgbox');
  $boxes.each(function(index, box) {
    var $box = $(box);
    $box.width(  $box.parent().width() );
    $box.height( $box.parent().width() );
  });

  // Elipsa
  if (document.getElementById("elipsa")) {
    var brd1=JXG.JSXGraph.initBoard('elipsa',{boundingbox:[-3,3,3,-3], keepaspectratio:true, showCopyright: false, showNavigation: false});
    var A = brd1.create('point',[-1,1]);
    var B = brd1.create('point',[1,1]);
    var C = brd1.create('point',[0,-1]);
    var ell = brd1.create('ellipse',[A,B,C]);
  }

  //Hiperbola
  if (document.getElementById("hiperbola")) {
    var brd3=JXG.JSXGraph.initBoard('hiperbola',{boundingbox:[-3,3,3,-3], keepaspectratio:true, showCopyright: false, showNavigation: false});
    var A = brd3.create('point',[0,1]);
    var B = brd3.create('point',[1,1]);
    var C = brd3.create('point',[0,-1]);
    var hyp = brd3.create('hyperbola',[A,B,C]);
  }
  
  //Parabola
  if (document.getElementById("parabola")) {
    var brd5=JXG.JSXGraph.initBoard('parabola',{boundingbox:[-3,3,3,-3], keepaspectratio:true, showCopyright: false, showNavigation: false});
    var A = brd5.create('point',[-1,1]);
    var B = brd5.create('point',[1,1]);
    var line = brd5.create('line',[A,B]);
    var C = brd5.create('point',[0,-1]);
    var par = brd5.create('parabola',[C,line]);
  }

  //Five circle theorem
  if (document.getElementById("fivecircle")) {
    var brd = JXG.JSXGraph.initBoard('fivecircle',{boundingbox:[-5,5,5,-5], showCopyright: false, showNavigation: false});
    var p = [], l = [], i = [], c = [], j = [], k;
     
    p[0] = brd.create('point',[-2.5,-3],{name:'',strokeColor:'#7355ff',fillColor:'#7355ff'});
    p[1] = brd.create('point',[-0,4],{name:'',strokeColor:'#7355ff',fillColor:'#7355ff'});
    p[2] = brd.create('point',[2.5,-3],{name:'',strokeColor:'#7355ff',fillColor:'#7355ff'});
    p[3] = brd.create('point',[-4,0],{name:'',strokeColor:'#7355ff',fillColor:'#7355ff'});
    p[4] = brd.create('point',[4,0],{name:'',strokeColor:'#7355ff',fillColor:'#7355ff'});
     
    for (k=0;k<5;k++) {
       l[k] = brd.create('segment',[p[k],p[(k+1)%5]],{strokeColor:'black',strokeWidth:1});
    }
     
    for (k=0;k<5;k++) {
       i[k] = brd.create('intersection',[l[k],l[(k+2)%5],0],{name:'',strokeColor:'#EAEA00',fillColor:'#EAEA00'});
    }
     
    for (k=0;k<5;k++) {
       c[k] = brd.create('circumcircle',[p[k],i[k],i[(k+2)%5]],{strokeColor:'gray', strokeWidth:1, point: {visible: false}});
    }
    for (k=0;k<5;k++) {
       j[k] = brd.create('intersection',[c[k],c[(k+2)%5],0],{name:'',strokeColor:'#EA0000',fillColor:'#EA0000'});
    }
     
    cc = brd.create('circumcircle',[j[0],j[2],j[3]],{strokeColor:'red',strokeWidth:2,point:{strokeColor:'#000000',fillColor:'#000000',size:1}});
    brd.update();
  }

  //Apollonian circle packing
  if (document.getElementById("apollo")) {
    var brd = JXG.JSXGraph.initBoard('apollo', {boundingbox: [-2, 2, 2, -2], showCopyright: false, showNavigation: false});
    solveQ2 = function(x1,x2,x3,off) {
        var a, b, c, d;
        a = 0.5;
        b = -(x1+x2+x3);
        c = x1*x1+x2*x2+x3*x3-0.5*(x1+x2+x3)*(x1+x2+x3)-off;
        d = b*b-4*a*c;
        if (Math.abs(d)<0.00000001) d = 0.0;
        return [(-b+Math.sqrt(d))/(2.0*a),(-b-Math.sqrt(d))/(2.0*a)];
    }   
     
    a = brd.create('segment',[[0,0],[2,0]],{visible:false});
    p1 = brd.create('glider',[1.3,0,a],{name:'Drag me'});
    b0 = -0.5;
     
    c0 = brd.create('circle',[[0,0],Math.abs(1.0/b0)],{strokeWidth:1});
    c1 = brd.create('circle',[p1,function(){return 2-p1.X();}],{strokeWidth:1});
     
    c2 = brd.create('circle',[[function(){return p1.X()-2;},0],function(){return p1.X();}],{strokeWidth:1});
    c0.curvature = function(){ return b0;}; // constant
    c1.curvature = function(){ return 1/(2-p1.X());};
    c2.curvature = function(){ return 1/(p1.X());};
     
    thirdCircleX = function() {
        var b0,b1,b2,x0,x1,x2, b3,bx3;
        b0 = c0.curvature();
        b1 = c1.curvature();
        b2 = c2.curvature();
        x0 = c0.midpoint.X();
        x1 = c1.midpoint.X();
        x2 = c2.midpoint.X();
     
        b3 = solveQ2(b0,b1,b2,0);
        bx3 = solveQ2(b0*x0,b1*x1,b2*x2,2);
        return bx3[0]/b3[0];
    }
    thirdCircleY = function() {
        var b0,b1,b2,y0,y1,y2, b3,by3;
        b0 = c0.curvature();
        b1 = c1.curvature();
        b2 = c2.curvature();
        y0 = c0.midpoint.Y();
        y1 = c1.midpoint.Y();
        y2 = c2.midpoint.Y();
     
        b3 = solveQ2(b0,b1,b2,0);
        by3 = solveQ2(b0*y0,b1*y1,b2*y2,2);
        return by3[0]/b3[0];
    }
    thirdCircleRadius = function() {
        var b0,b1,b2, b3,bx3,by3;
        b0 = c0.curvature();
        b1 = c1.curvature();
        b2 = c2.curvature();
        b3 = solveQ2(b0,b1,b2,0);
        return 1.0/b3[0];
    }
     
    c3 = brd.create('circle',[[thirdCircleX,thirdCircleY],thirdCircleRadius],{strokeWidth:1});
    c3.curvature = function(){ return 1.0/this.radius;};
     
    otherCirc = function(circs,level) {
        var c, fx,fy,fr;
        if (level<=0) return;
        fx = function() {
            var b,x,i;
            b = [];
            x = [];
            for (i=0;i<4;i++) {
                b[i] = circs[i].curvature();
                x[i] = circs[i].midpoint.X();
            }
     
            b[4] = 2*(b[0]+b[1]+b[2])-b[3];
            x[4] = (2*(b[0]*x[0]+b[1]*x[1]+b[2]*x[2])-b[3]*x[3])/b[4];
            return x[4];
        }
        fy = function() {
            var b,y,i;
            b = [];
            y = [];
            for (i=0;i<4;i++) {
                b[i] = circs[i].curvature();
                y[i] = circs[i].midpoint.Y();
            }
     
            b[4] = 2*(b[0]+b[1]+b[2])-b[3];
            y[4] = (2*(b[0]*y[0]+b[1]*y[1]+b[2]*y[2])-b[3]*y[3])/b[4];
            return y[4];
        }
        fr = function() {
            var b,i;
            b = [];
            for (i=0;i<4;i++) {
                b[i] = circs[i].curvature();
            }
            b[4] = 2*(b[0]+b[1]+b[2])-b[3];
            if (isNaN(b[4])) {
                return 1000.0;
            } else {
                return 1/b[4];
            }
        }
        c = brd.create('circle',[[fx,fy],fr],{strokeWidth:1,name:'',
                     fillColor:JXG.hsv2rgb(50*level,0.8,0.8),highlightFillColor:JXG.hsv2rgb(50*level,0.5,0.8),fillOpacity:0.5,highlightFillOpacity:0.5});
        c.curvature = function(){ return 1/this.radius;};
     
        // Recursion
        otherCirc([circs[0],circs[1],c,circs[2]],level-1);
        otherCirc([circs[0],circs[2],c,circs[1]],level-1);
        otherCirc([circs[1],circs[2],c,circs[0]],level-1);
        return c;
    }
     
    //-------------------------------------------------------
    brd.suspendUpdate();
    level = 4;
    otherCirc([c0,c1,c2,c3],level);
    otherCirc([c3,c1,c2,c0],level);
    otherCirc([c0,c2,c3,c1],level);
    otherCirc([c0,c1,c3,c2],level);
    brd.unsuspendUpdate();
  }

  //Hilbert curve
  if (document.getElementById("hilbertcurve")) {
    var b = JXG.JSXGraph.initBoard('hilbertcurve', {boundingbox: [-4, 4, 116, -116], showCopyright: false, showNavigation: false});
          var UP = 0;
          var LEFT = 1;
          var DOWN = 2;
          var RIGHT = 3;
          var pos = [0,0];
          var step = 1;
          var pointsX = [];
          var pointsY = [];
   
          move = function(dir)  {
                  switch (dir) {
                      case LEFT:
                          pos[0] -= step;
                          break;
                      case RIGHT:
                          pos[0] += step;
                          break;
                      case UP:
                          pos[1] += step;
                          break;
                      case DOWN:
                          pos[1] -= step;
                          break;
                  } 
                  pointsX[pointsX.length] = pos[0];
                  pointsY[pointsY.length] = pos[1];
          };
   
          hilbert = function(level,dir) {
              if (level<=1) {
                  switch (dir) {
                      case LEFT:
                          move(RIGHT);     
                          move(DOWN);      
                          move(LEFT);
                          break;
                      case RIGHT:
                          move(LEFT);
                          move(UP);
                          move(RIGHT);
                          break;
                      case UP:
                          move(DOWN);
                          move(RIGHT);
                          move(UP);
                          break;
                      case DOWN:
                          move(UP);
                          move(LEFT);
                          move(DOWN);
                          break;
                  } 
              } else {
                  switch (dir) {
                      case LEFT:
                          hilbert(level-1,UP);
                          move(RIGHT);
                          hilbert(level-1,LEFT);
                          move(DOWN);
                          hilbert(level-1,LEFT);
                          move(LEFT);
                          hilbert(level-1,DOWN);
                          break;
                      case RIGHT:
                          hilbert(level-1,DOWN);
                          move(LEFT);
                          hilbert(level-1,RIGHT);
                          move(UP);
                          hilbert(level-1,RIGHT);
                          move(RIGHT);
                          hilbert(level-1,UP);
                          break;
                      case UP:
                          hilbert(level-1,LEFT);
                          move(DOWN);
                          hilbert(level-1,UP);
                          move(RIGHT);
                          hilbert(level-1,UP);
                          move(UP);
                          hilbert(level-1,RIGHT);
                          break;
                      case DOWN:
                          hilbert(level-1,RIGHT);
                          move(UP);
                          hilbert(level-1,DOWN);
                          move(LEFT);
                          hilbert(level-1,DOWN);
                          move(DOWN);
                          hilbert(level-1,LEFT);
                          break;
                  } 
              }
          };
   
          var curve = b.create('curve',[pointsX,pointsY],{curveType:'plot'});
          // we don't need highlighting. improves speed on mouse move
          curve.hasPoint = function () { return false; }
   
          var s = b.create('slider', [[0.75,-110],[50,-110],[1,1,9]], {name:'S',snapWidth:1});
          var oldlev = -1;
          curve.updateDataArray = function() {
              maxlev = Math.round(s.Value());
              if (oldlev==maxlev) {
                  return;
              }
              pos = [0,0];
              pointsX = [0];
              pointsY = [0];
              step = 50/(Math.pow(2,maxlev-1));
              hilbert(maxlev,LEFT);
              this.dataX = pointsX;
              this.dataY = pointsY;
              oldlev=maxlev;
          };
    b.update();
  }

  //Hyperbolic curve
  if (document.getElementById("hyperboliccurve")) {
    var board = JXG.JSXGraph.initBoard('hyperboliccurve', {boundingbox: [-10, 10, 10, -10], showCopyright: false, showNavigation: false});
    var a = board.create('slider', [[0,5],[8,5],[0,4,30]],{name:'a'});
    var c = board.create('curve', [function(phi){return a.Value()/phi; }, [0, 0],0, 8*Math.PI],
               {curveType:'polar', strokewidth:4});
  }

  //Euler line
  if (document.getElementById("eulerline")) {
  (function () {
 
    var board = JXG.JSXGraph.initBoard('eulerline', {boundingbox: [-1.5, 2, 1.5, -1], keepaspectratio:true, showCopyright: false, showNavigation: false});
 
    var cerise = {
            strokeColor: '#901B77',
            fillColor: '#CA147A'
        },
 
        grass = {
            strokeColor: '#009256',
            fillColor: '#65B72E',
            visible: true,
            withLabel: true
        },
 
        perpendicular = {
            strokeColor: 'black',
            dash: 1,
            strokeWidth: 1,
            point: JXG.deepCopy(cerise, {
                visible: true,
                withLabel: true
            })
        },
 
        median = {
            strokeWidth: 1,
            strokeColor: '#333333',
            dash:2
        },
 
        A = board.create('point', [1, 0], cerise),
        B = board.create('point', [-1, 0], cerise),
        C = board.create('point', [0.2, 1.5], cerise),
        pol = board.create('polygon',[A,B,C], {
            fillColor: '#FFFF00',
            lines: {
                  strokeWidth: 2,
                  strokeColor: '#009256'
              }
          });
   
      var pABC, pBCA, pCAB, i1;
      perpendicular.point.name = 'H_c';
      pABC = board.create('perpendicular', [pol.borders[0], C], perpendicular);
      perpendicular.point.name = 'H_a';
      pBCA = board.create('perpendicular', [pol.borders[1], A], perpendicular);
      perpendicular.point.name = 'H_b';
      pCAB = board.create('perpendicular', [pol.borders[2], B], perpendicular);
      grass.name = 'H';
      i1 = board.create('intersection', [pABC, pCAB, 0], grass);
   
      var mAB, mBC, mCA;
      cerise.name = 'M_c';
      mAB = board.create('midpoint', [A, B], cerise);
      cerise.name = 'M_a';
      mBC = board.create('midpoint', [B, C], cerise);
      cerise.name = 'M_b';
      mCA = board.create('midpoint', [C, A], cerise);
   
      var ma, mb, mc, i2;
      ma = board.create('segment', [mBC, A], median);
      mb = board.create('segment', [mCA, B], median);
      mc = board.create('segment', [mAB, C], median);
      grass.name = 'S';
      i2 = board.create('intersection', [ma, mc, 0], grass);
   
      var c;
      grass.name = 'U';
      c = board.create('circumcircle',[A, B, C], {
          strokeColor: '#000000',
          dash: 3,
          strokeWidth: 1,
          point: grass
      });
   
      var euler;
      euler = board.create('line', [i1, i2], {
          strokeWidth: 2,
          strokeColor:'#901B77'
      });
      board.update();
    })();
  }

  //Try a triangle
  if (document.getElementById("triunghiulnostru")) {
    var board = JXG.JSXGraph.initBoard('triunghiulnostru', {boundingbox: [-10, 10, 10, -10], showCopyright: false, showNavigation: false});
    var p1 = board.create('point', [0.0, 2.0]);
    var p2 = board.create('point', [2.0, 1.0]);
    var p3 = board.create('point', [4.0, 6.0]);
    // var p4 = board.create('point', [1.0, 3.0]);

    var pol = board.create('polygon', [p1, p2, p3]);
  }

  // Processing Canvas #1
  if (document.getElementById("canvas1")) {

    var canvas = document.getElementById("canvas1");
    var processingInstance = new Processing(canvas, (function($p) {

        function setup() {
          $p.size(200, 200);
          $p.noStroke();
          $p.colorMode($p.RGB, 98, 123, 180, 100);
          $p.rectMode($p.CENTER);
        }
          $p.setup = setup;function draw() {
          $p.background(51);
          $p.fill(42, 80, 20, 70);
          $p.rect($p.mouseX, $p.height/2, $p.mouseY/2+10, $p.mouseY/2+10);
          $p.fill(255, 80, 50, 70);
          $p.rect($p.width-$p.mouseX, $p.height/2, (($p.height-$p.mouseY)/2)+10, (($p.height-$p.mouseY)/2)+10);
        }
          $p.draw = draw;
        }
      )
    );
  }



  // Processing Canvas #2
  if (document.getElementById("canvas2")) {
    var canvas = document.getElementById("canvas2")
    var processingInstance = new Processing(canvas, 

      // this code was autogenerated from PJS
      (function($p) {
        var Eye = (function() {
          function Eye() {
            var $this_1 = this;
            function $superCstr(){$p.extendClassChain($this_1)}
            $this_1.ex = 0;
            $this_1.ey = 0;
            $this_1.size = 0;
            $this_1.angle =  0.0;
            function update$2(mx, my) {
              $this_1.angle = $p.atan2(my-$this_1.ey, mx-$this_1.ex);
            }
            $p.addMethod($this_1, 'update', update$2, false);
            function display$0() {
              $p.pushMatrix(); 
              $p.translate($this_1.ex, $this_1.ey); 
              $p.fill(255, 200, 30); 
              $p.ellipse(0, 0, $this_1.size, $this_1.size); 
              $p.rotate($this_1.angle); 
              $p.fill(255, 0, 0); 
              $p.ellipse($this_1.size/4, 0, $this_1.size/2, $this_1.size/2); $p.popMatrix();
            }
            $p.addMethod($this_1, 'display', display$0, false);
            function $constr_3(x, y, s){
              $superCstr();

              $this_1.ex = x; $this_1.ey = y; $this_1.size = s;
            }

            function $constr() {
              if(arguments.length === 3) { $constr_3.apply($this_1, arguments); } else $superCstr();
            }
            $constr.apply(null, arguments);
          }
          return Eye;
        })();
        $p.Eye = Eye;

        var e1 = null,e2 = null,e3 = null,e4 = null,e5 = null;function setup() {
          $p.size(200, 200); 
          $p.smooth(); 
          $p.noStroke(); 
          e1 = new Eye( 50, 16, 80); 
          e2 = new Eye( 64, 85, 40); 
          e3 = new Eye( 90, 200, 120); 
          e4 = new Eye(150, 44, 40); 
          e5 = new Eye(175, 120, 80);
        }
        $p.setup = setup;function draw() {
          $p.background(102); 
          e1.update($p.mouseX, $p.mouseY); 
          e2.update($p.mouseX, $p.mouseY); 
          e3.update($p.mouseX, $p.mouseY); 
          e4.update($p.mouseX, $p.mouseY); 
          e5.update($p.mouseX, $p.mouseY); 
          e1.display(); 
          e2.display(); 
          e3.display(); 
          e4.display(); 
          e5.display();
        }
          $p.draw = draw;
      })
    )
  }

  
  // Processing Canvas #3
  if (document.getElementById("canvas3")) {
    var canvas = document.getElementById("canvas3")
    var processingInstance = new Processing(canvas,
      function($p) {
          var num =  60;
          var mx =  $p.createJavaArray('float', [num]);
          var my =  $p.createJavaArray('float', [num]);
        function setup() {
          // $p.size(400, 400); 
          $p.size($("#canvas3").parent().width(), $("#canvas3").parent().width());
          $p.smooth(); 
          $p.noStroke(); 
          $p.fill(204, 102, 0);
        }
        $p.setup = setup;function draw() {
        $p.background(51); // Reads throught the entire array // and shifts the values to the left 
        for(var i = 1;  i<num;  i++) {
          mx[i-1] = mx[i]; my[i-1] = my[i];
        } // Add the new values to the end of the array 
          mx[num-1] = $p.mouseX; 
          my[num-1] = $p.mouseY; 
          for(var i = 0;  i<num;  i++) {
            $p.ellipse(mx[i], my[i], i/2, i/2);
          }
        }
        $p.draw = draw;
      }
    )
  }

  // Processing canvas 4
  if (document.getElementById("canvas4")) {
    var canvas = document.getElementById("canvas4")
    var processingInstance = new Processing(canvas, 
      (function($p) {

        var w =  $("#canvas4").parent().width();
        var h =  $("#canvas4").parent().width();

        var origX =  w/2;
        var origY =  h/2;
        var stat =  1;
        function setup() {
          $p.size(w, h); $p.frameRate(30);
        }
        $p.setup = setup; 
        function draw() {
          var newX =  $p.parseInt($p.random(10, w-10)); 
          var newY =  $p.parseInt($p.random(10, h-10)); 
          $p.line(origX, origY, newX, newY); 
          $p.stroke($p.parseInt($p.random(0, 255)), $p.parseInt($p.random(0, 255)), $p.parseInt($p.random(0, 255)), $p.parseInt($p.random(30, 255)));

        }
          $p.draw = draw;
        function mousePressed() {
          $p.background($p.parseInt($p.random(0, 255)), $p.parseInt($p.random(0, 255)), $p.parseInt($p.random(0, 255))); // 
          origX = $p.parseInt($p.random(10,w-10)); // 
          origY = $p.parseInt($p.random(10,h-10)); 
          origX = $p.mouseX; 
          origY = $p.mouseY; 
          $p.strokeWeight($p.parseInt($p.random(1, 20))); 
        if (stat == 0) {
          $p.loop(); 
          stat = 1;
        }
      }
    $p.mousePressed = mousePressed;
    function keyPressed() {
      if (stat == 1) {
        $p.noLoop(); stat = 0;
      } else {
        $p.loop(); stat = 1;
      }
    }
      $p.keyPressed = keyPressed;
    })
  )

  }

});