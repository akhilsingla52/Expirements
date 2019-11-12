
function Snake() {

    this.init = function() {
        this.x = floor(width/2)-scl;
        this.y = floor(height/2)-scl;
        this.xspeed = 0;
        this.yspeed = 0;
        this.total = 0;
        this.tail = [];
    }

    this.eat = function(pos) {
        var d = dist(this.x, this.y, pos.x, pos.y);
        if(d<1) {
            this.total++;
            return true;
        } else {
            return false;
        }
    }

    this.dir = function(x, y) {
        this.xspeed=x;
        this.yspeed=y;
    }

    this.death = function() {
        if(this.total==0 && (this.x > width-scl || this.y > height-scl))
            this.init();
        for(var i=0; i<this.tail.length-1; i++) {
            var pos = this.tail[i];
            var d = dist(this.x, this.y, pos.x, pos.y);
            if(d < 1) this.init();
        }
    }

    this.update = function() {
        if(this.total === this.tail.length) {
            for(var i=0; i<this.tail.length-1; i++) {
                this.tail[i] = this.tail[i+1];
            }
        }
        this.tail[this.total-1] = createVector(this.x, this.y);

        this.x += this.xspeed*scl;
        this.y += this.yspeed*scl;

        this.x = constrain(this.x, 0, width-scl);
        this.y = constrain(this.y, 0, height-scl);
    }

    this.show = function() {
        fill(255);
        
        for(var i=0; i<this.tail.length; i++) {
            rect(this.tail[i].x, this.tail[i].y, scl, scl);
        }

        rect(this.x, this.y, scl, scl);
    }
}