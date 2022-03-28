class e{static defaultFont="'PT Sans'";static scaling=1;static get width(){return t.maxX*e.scaling}static get height(){return t.maxY*e.scaling}static toPixels(t){return t*e.scaling}static fromPixels(t){return t/e.scaling}static updateScaling(){const s=window.innerWidth,r=window.innerHeight,i=r*t.aspectRatio<s?r*t.aspectRatio:s;e.scaling=i/t.maxX}constructor(){const t=document.getElementById("root");this.canvas=document.createElement("canvas"),this.context=this.canvas.getContext("2d"),this.canvas.width=e.width,this.canvas.height=e.height,t.append(this.canvas)}withAbsolutePosition(e,t){this.context.translate(-e.realX,-e.realY),t(),this.context.translate(e.realX,e.realY)}withAbsoluteFacing(e,t){this.context.rotate(-e),t(),this.context.rotate(e)}withAbsoluteCenterAndFacing(e,t,s){this.withAbsoluteFacing(t,(()=>{this.withAbsolutePosition(e,s)}))}withRelativeCenter(e,t){this.context.translate(e.realX,e.realY),t(),this.context.translate(-e.realX,-e.realY)}withRelativeFacing(e,t){this.context.rotate(e),t(),this.context.rotate(-e)}withCenterAndFacing(e,t,s){this.withRelativeCenter(e,(()=>{this.withRelativeFacing(t,s)}))}setStroke(t="#000000",s=2){this.context.strokeStyle=t,this.context.lineWidth=e.toPixels(s)}setFill(e){this.context.fillStyle=e}setFont(t,s="#ffffff",r="center"){this.setFill(s),this.setStroke("#000000"),this.context.font=`bold ${e.toPixels(t)}px ${e.defaultFont}`,this.context.textAlign=r,this.context.textBaseline="middle"}clear(){this.context.clearRect(0,0,e.width,e.height)}fill(t){this.setFill(t),this.context.fillRect(0,0,e.width,e.height)}drawText(e,t){this.context.fillText(t,e.realX,e.realY)}drawTextWithOutline(e,t){this.drawText(e,t),this.context.strokeText(t,e.realX,e.realY)}drawLine(e,t){this.context.beginPath(),this.context.moveTo(e.realX,e.realY),this.context.lineTo(t.realX,t.realY),this.context.stroke()}drawRect(t,s,r){this.context.beginPath(),this.context.rect(t.realX,t.realY,e.toPixels(s),e.toPixels(r)),this.context.fill(),this.context.stroke()}drawArc(t,s){this.context.beginPath(),this.context.arc(t.realX,t.realY,e.toPixels(s),0,2*Math.PI),this.context.fill(),this.context.stroke()}drawPolygon(...e){if(e.length<3)throw new TypeError("A polygon requires at least 3 Points");this.context.beginPath(),this.context.moveTo(e[0].realX,e[0].realY);for(const t of e)this.context.lineTo(t.realX,t.realY);this.context.closePath(),this.context.fill(),this.context.stroke()}}class t{static maxX=1280;static maxY=720;static get aspectRatio(){return t.maxX/t.maxY}static clone(e){return new t(e.x,e.y)}static fromPercentage(e,s){return new t(t.maxX*e/100,t.maxY*s/100)}static fromRealXY(s,r){return new t(e.fromPixels(s),e.fromPixels(r))}get realX(){return e.toPixels(this.x)}get realY(){return e.toPixels(this.y)}get outOfGameArea(){return this.x<0||this.x>t.maxX||this.y<0||this.y>t.maxY}constructor(e,t){this.x=e,this.y=t}plus(e){return new t(this.x+e.x,this.y+e.y)}minus(e){return new t(this.x-e.x,this.y-e.y)}times(e){return new t(this.x*e,this.y*e)}shiftX(e){return new t(this.x+e,this.y)}shiftY(e){return new t(this.x,this.y+e)}shiftXY(e,s){return new t(this.x+e,this.y+s)}between(e,t){return this.x>=e.x&&this.x<=t.x&&this.y>=e.y&&this.y<=t.y}distanceTo(e){return Math.sqrt((this.x-e.x)**2+(this.y-e.y)**2)}facingTo(e){return Math.atan2(e.y-this.y,e.x-this.x)}}const s="#55aa33",r="#338811";function i(e,t=120,s=0){return`hsl(${e*(t-s)+s}, 100%, 60%)`}function a(e,t){return Math.floor(Math.random()*(t-e+1))+e}class o{renderRelative(e){e.withCenterAndFacing(this.coords,this.facing,(()=>this.render(e)))}next(e){this.coords.x+=this.speed.x*e,this.coords.y+=this.speed.y*e}face(e){this.facing=this.coords.facingTo(e)}}class n extends o{health=1;outlineColor="transparent";get percentHealth(){return this.health/this.maxHealth}get isDead(){return this.health<=0}render(e){e.setStroke(this.outlineColor),e.setFill(this.primaryColor),e.drawArc(new t(0,0),this.radius),this.renderHealth(e)}renderHealth(e){if(!this.showHealth)return;const s=this.maxHealth/5,r=this.health/this.maxHealth,a=Math.max(s*r,0);e.setStroke("#000000"),e.setFill(i(r)),e.withAbsoluteFacing(this.facing,(()=>{e.drawRect(new t(-a/2,2*-this.radius),a,7)}))}collidesWith(e){return this.coords.distanceTo(e.coords)<this.radius+e.radius}closestCharacter(e){let t,s=1/0;return e.forEach((e=>{const r=this.coords.distanceTo(e.coords);this.coords.distanceTo(e.coords)<s&&(s=r,t=e)})),t}sufferDamage(e){const t=Math.max(e-this.health,0);return this.health=Math.max(this.health-e,0),t}recieveHeal(e){const t=this.health;this.health=Math.min(this.health+e,this.maxHealth);return this.health-t}}class l extends n{outlineColor="#000000";get speed(){const e=this.moveSpeed*Math.cos(this.facing),s=this.moveSpeed*Math.sin(this.facing);return new t(e,s)}next(e){this.faceClosestPlayer(),super.next(e)}render(e){this.renderHands(e),super.render(e)}faceClosestPlayer(){this.face(this.closestCharacter(d.players).coords)}renderHands(e){e.setStroke(this.outlineColor),e.setFill(this.secondaryColor),e.drawArc(new t(.8*this.radius,.8*-this.radius),.3*this.radius),e.drawArc(new t(.8*this.radius,.8*this.radius),.3*this.radius)}spawn(){const e=a(1,4);1===e?this.coords=t.fromPercentage(a(0,100),0).shiftY(-this.radius):2===e?this.coords=t.fromPercentage(100,a(0,100)).shiftX(this.radius):3===e?this.coords=t.fromPercentage(a(0,100),100).shiftY(this.radius):4===e&&(this.coords=t.fromPercentage(0,a(0,100)).shiftX(-this.radius))}}class h extends l{showHealth=!1;next(e){super.next(e),this.weapon.canAutoFire&&this.weapon.fire()}render(e){this.renderWeapon(e),super.render(e)}renderWeapon(e){this.weapon.render(e)}}const d=new class{mousePosition=t.fromPercentage(50,50);setStage(e){this.stage=e,this.stage.registerEventListeners()}destroyPlayer(e){this.players.delete(e)}destroyZombie(e){if("explode"in e){const t=e.explode();this.explosions.add(t)}e instanceof h&&this.bosses.delete(e),this.zombies.delete(e),this.score+=e.scoreValue}destroyBoss(e){this.zombies.delete(e),this.bosses.delete(e),this.score+=e.scoreValue}destroyProjectile(e){this.projectiles.delete(e)}destroyPowerup(e){this.powerups.delete(e)}destroyExplosion(e){this.explosions.delete(e)}};class c{layers={};eventListeners={};uiElements={};areEventListenersRegistered=!1;next(e){}renderUiElements(e){for(const t in this.uiElements){this.uiElements[t].render(e)}}clearLayers(){for(const e in this.layers){this.layers[e].clear()}}registerEventListeners(){if(!this.areEventListenersRegistered){for(const e in this.eventListeners){const t=this.eventListeners[e];window.addEventListener(e,(e=>{d.stage===this&&(e.preventDefault(),t.call(this,e))}))}this.areEventListenersRegistered=!0}}}class m extends n{maxShield=100;shield=0;showHealth=!1;speed=new t(0,0);facing=0;outlineColor="#000000";inventory=null;constructor(e=new t(50,50)){super(),this.coords=e}get percentShield(){return this.shield/this.maxShield}render(e){this.renderHands(e),this.renderWeapon(e),super.render(e)}renderWeapon(e){this.weapon.render(e)}renderHands(e){const s=new t(this.radius,0),[r,i]=this.weapon.handOffsets;e.setStroke("#000000"),e.setFill(this.primaryColor),e.drawArc(s.plus(r),.4*this.radius),e.drawArc(s.plus(i),.4*this.radius)}next(e){this.face(d.mousePosition),this.weapon.canAutoFire&&this.weapon.fire();this.coords.plus(this.speed.times(e)).outOfGameArea||super.next(e)}sufferDamage(e){let t=e;if(this.shield>0){const e=Math.max(t-this.shield,0);this.shield=Math.max(this.shield-t,0),t=e}return this.health-=t,t}}class w{isFiring=!1;ammo=0;lastFire=0;reloadStarted=0;reloadTimer=0;constructor(e){this.owner=e}render(e){e.setStroke("#000000"),e.setFill(this.primaryColor),e.drawRect(new t(this.owner.radius,-this.width/2),this.length,this.width)}get canFire(){const e=Date.now()-this.lastFire,t=this.ammo>0;return e>=this.rateOfFire&&t}get canAutoFire(){return this.isAutomatic&&this.isFiring&&this.canFire}get isReloading(){return this.reloadTimer>0}get reloadProgress(){return 1-(Date.now()-this.reloadStarted)/this.reloadTime}reload(){this.isReloading&&clearInterval(this.reloadTimer),this.reloadStarted=Date.now(),this.ammo=0,this.reloadTimer=setTimeout((()=>{this.ammo=this.maxAmmo,this.reloadTimer=0}),this.reloadTime)}fire(){if(this.canFire&&this.ammo>0){const e=new this.ProjectileType(this.owner);e.facing=this.owner.facing,this.ammo--,this.lastFire=Date.now(),0===this.ammo&&this.reload(),d.projectiles.add(e)}}}class u extends n{maxHealth=0;showHealth=!1;get speed(){return new t(Math.cos(this.facing)*this.moveSpeed,Math.sin(this.facing)*this.moveSpeed)}constructor(e){super(),this.coords=t.clone(e.coords),e instanceof l?this.targets=d.players:e instanceof m&&(this.targets=d.zombies)}render(e){this.renderTrail(e),super.render(e)}renderTrail(e){e.setStroke(this.secondaryColor,2*this.radius),e.drawLine(new t(0,0),new t(-this.trailLength,0))}}class p extends u{name="9MM BULLET";description="SMALL BULLET WITH LITTLE DAMAGE";radius=2;moveSpeed=1e3;damage=25;primaryColor="#222222";secondaryColor="rgba(0, 0, 0, 0.5)";trailLength=10}class f extends w{length=15;width=6;primaryColor="#cccccc";isAutomatic=!1;rateOfFire=150;reloadTime=1e3;maxAmmo=20;ProjectileType=p;handOffsets=[new t(0,0),new t(0,0)];ammo=this.maxAmmo}class x extends m{name="SCOUT";description="THE NIMBLE";radius=15;moveSpeed=150;maxHealth=150;weapon=new f(this);health=this.maxHealth;primaryColor="#558800";secondaryColor="#335500";render(e){e.setStroke("#000000"),e.setFill(this.secondaryColor),e.drawArc(new t(.6*-this.radius,0),.8*this.radius),super.render(e)}}class y extends w{length=35;width=8;primaryColor="#555555";isAutomatic=!0;rateOfFire=100;reloadTime=2500;maxAmmo=30;ProjectileType=p;handOffsets=[new t(0,-2),new t(20,2)];ammo=this.maxAmmo}class g extends m{name="SOLDIER";description="THE STRONG";radius=20;moveSpeed=125;maxHealth=200;weapon=new y(this);health=this.maxHealth;primaryColor="#228811";secondaryColor="#115500";render(e){super.render(e),e.setFill(this.secondaryColor),e.drawArc(new t(-2,0),.8*this.radius)}}class P extends u{name="12MM BULLET";description="FAST BULLET WITH HIGH DAMAGE";radius=3;moveSpeed=1500;damage=100;primaryColor="#111111";secondaryColor="rgba(0, 0, 0, 0.5)";trailLength=20}class E extends w{length=50;width=8;primaryColor="#882200";isAutomatic=!1;rateOfFire=300;reloadTime=1500;maxAmmo=12;ProjectileType=P;handOffsets=[new t(0,-2),new t(30,2)];ammo=this.maxAmmo}class S extends m{name="HEAVY";description="THE TOUGH";radius=20;moveSpeed=100;maxHealth=400;weapon=new E(this);health=this.maxHealth;primaryColor="#555588";secondaryColor="#333355";render(e){e.setStroke("#000000",.3),e.setFill(this.secondaryColor),e.drawArc(new t(0,0),1.2*this.radius),super.render(e)}}class T{get isHovered(){return this.isWithinBoundaries(d.mousePosition)}isWithinBoundaries(e){return!1}}class R extends T{static width=500;static height=100;constructor(e,t){super(),this.player=e,this.coords=t}render(e){if(this.isHovered){const t=this.coords.shiftXY(-R.width/2,-R.height/2);e.setFill("#222222"),e.drawRect(t,R.width,R.height)}this.player.coords=this.coords.shiftX(R.width/4),this.player.renderRelative(e),e.setFont(22,"#ffffff","left"),e.drawText(this.coords.shiftXY(-R.width/3,-R.height/5),this.player.name),e.setFont(20,"#aaaaaa","left"),e.drawText(this.coords.shiftXY(-R.width/3,R.height/5),this.player.description)}isWithinBoundaries(e){const t=this.coords.shiftXY(-R.width/2,-R.height/2),s=this.coords.shiftXY(R.width/2,R.height/2);return e.between(t,s)}}class v extends l{static spawnRate=1.5;name="COMMON ZOMBIE";radius=17;moveSpeed=75;maxHealth=1;damage=10;scoreValue=1;health=this.maxHealth;primaryColor="#666666";secondaryColor="#888888";showHealth=!1}class A extends l{static spawnRate=.2;name="HULK ZOMBIE";radius=30;moveSpeed=50;maxHealth=200;damage=50;scoreValue=10;health=this.maxHealth;primaryColor="#444444";secondaryColor="#666666";showHealth=!0}class F extends l{static spawnRate=.5;name="RUNNER ZOMBIE";radius=13;moveSpeed=150;maxHealth=1;damage=5;scoreValue=2;health=this.maxHealth;primaryColor="#447744";secondaryColor="#557755";showHealth=!1}class C extends o{duration=100;startTime=Date.now();radius=0;constructor(e,t,s){super(),this.coords=e,this.maxRadius=t,this.damage=s}get percentExploded(){return this.radius/this.maxRadius}get isFinished(){return this.radius>=this.maxRadius}render(e){e.setStroke("#000000"),e.setFill(i(this.percentExploded,60,0)),e.drawArc(new t(0,0),this.radius)}next(e){const t=Date.now()-this.startTime;this.radius=Math.min(t/this.duration,1)*this.maxRadius}collidesWith(e){return this.coords.distanceTo(e.coords)<this.radius+e.radius}}class H extends l{static spawnRate=.3;name="BOOMER ZOMBIE";radius=20;moveSpeed=75;maxHealth=50;damage=100;scoreValue=5;explosionRadius=80;explosionDamage=50;health=this.maxHealth;primaryColor="#aa6666";secondaryColor="#bb8888";showHealth=!0;explode(){return new C(this.coords,this.explosionRadius,this.explosionDamage)}}class O extends T{static coords=t.fromPercentage(1,91);static width=200;static height=55;render(e){const t=O.width-10,s=O.coords.shiftXY(5,5),r=t*d.localPlayer.percentHealth;if(e.setStroke("#000000",2),e.setFill(d.localPlayer.primaryColor),e.drawRect(O.coords,O.width,O.height),e.setFill(i(d.localPlayer.percentHealth)),e.drawRect(s,r,20),e.setFont(18,"#000000","left"),e.drawText(s.shiftXY(1,10),d.localPlayer.health.toString()),d.localPlayer.shield>0){const r=25,a=s.shiftY(r),o=t*d.localPlayer.percentShield;e.setFill(i(d.localPlayer.percentShield,240,120)),e.drawRect(a,o,20),e.setFont(18,"#000000","left"),e.drawText(a.shiftXY(1,10),d.localPlayer.shield.toString())}}}class L extends T{static coords=O.coords.shiftXY(O.width+.4*O.height,O.height/2);static width=36;static height=36;render(e){const t=O.height/4,s=L.coords.shiftX(.2*-O.height);e.setStroke("#000000",2),e.setFill(d.localPlayer.secondaryColor),e.context.moveTo(s.realX-t,s.realY-2*t),e.context.bezierCurveTo(s.realX-t,s.realY-1.5*t,s.realX+1.5*t,s.realY-t,s.realX+1.5*t,s.realY),e.context.bezierCurveTo(s.realX+1.5*t,s.realY+t,s.realX-t,s.realY+1.5*t,s.realX-t,s.realY+2*t),e.context.fill(),e.context.stroke(),e.drawArc(L.coords,22),null!==d.localPlayer.inventory&&d.localPlayer.inventory.renderRelative(e)}}class Y extends n{outlineColor="#000000";maxHealth=0;showHealth=!1;constructor(e){super(),this.coords=t.clone(e)}pickup(e){null===e.inventory&&(e.inventory=this,this.coords=L.coords)}}class b extends Y{static dropRate=.05;name="HEAL";description="GIVES YOU BACK 50 HP";moveSpeed=0;radius=18;primaryColor="#20a473";secondaryColor="#ffffff";healAmount=50;pickup(e){this.activate(e)}activate(e){e.recieveHeal(this.healAmount)}render(e){super.render(e),e.setStroke("transparent"),e.setFill(this.secondaryColor),e.drawArc(new t(0,0),this.radius-4),e.setFill(this.primaryColor),e.drawRect(new t(-this.radius/2,-this.radius/8),this.radius,this.radius/4),e.drawRect(new t(-this.radius/8,-this.radius/2),this.radius/4,this.radius)}}class X extends Y{static dropRate=.02;name="SHIELD";description="GIVES YOU 100 SHIELD";moveSpeed=0;radius=18;primaryColor="#2073a4";secondaryColor="#ffffff";pickup(e){this.activate(e)}activate(e){e.shield=100}render(e){super.render(e),e.setStroke("transparent",0),e.setFill(this.secondaryColor),e.drawArc(new t(0,0),this.radius-4),e.setFill(this.primaryColor),e.drawPolygon(new t(-8,-8),new t(8,-8),new t(8,4),new t(0,10),new t(-8,4)),e.setFill("rgba(0, 0, 0, 0.2)"),e.drawPolygon(new t(-8,-8),new t(0,-8),new t(0,10),new t(-8,4))}}class D extends m{showHealth=!0;next(e){super.next(e)}render(e){this.renderWeapon(e),super.render(e)}renderWeapon(e){this.weapon.render(e)}}class M extends u{name="LASER BOLT";description="EXTREMELY FAST PROJECTILE WITH HIGH DAMAGE";radius=2;moveSpeed=2500;damage=50;primaryColor="#dd2222";secondaryColor="#dd2222";trailLength=15}class k extends w{length=15;width=6;primaryColor="#551111";isAutomatic=!0;rateOfFire=2e3;reloadTime=1e3;maxAmmo=1/0;ProjectileType=M;handOffsets=[new t(0,0),new t(0,0)];ammo=this.maxAmmo}class W extends D{name="AUTO TURRET";description="YOUR WORST NIGHTMARE";moveSpeed=30;radius=20;maxHealth=100;health=this.maxHealth;weapon=new k(this);primaryColor="#d05050";secondaryColor="#300000";constructor(){super(),this.weapon.isFiring=!0}next(e){const t=this.closestCharacter(d.zombies);t&&(this.face(t.coords),this.weapon.canAutoFire&&this.weapon.fire())}render(e){super.render(e),e.setFill(this.secondaryColor),e.drawArc(new t(0,0),.8*this.radius)}renderHands(){}}class I extends Y{static dropRate=.01;name="AUTO TURRET";description="SHOOTS ENEMIES WHEN PLACED DOWN";moveSpeed=0;radius=18;primaryColor="#d05050";secondaryColor="#300000";activate(e){const s=new W;s.coords=t.clone(e.coords),d.players.add(s),e.inventory=null}render(e){super.render(e),e.setStroke("transparent"),e.setFill(this.secondaryColor),e.drawArc(new t(0,0),this.radius-4),e.setFill(this.primaryColor),e.drawRect(new t(.5*-this.radius,.3*-this.radius),this.radius,this.radius/4),e.drawRect(new t(.5*-this.radius,.25*-this.radius),1.1*this.radius,.15*this.radius),e.drawRect(new t(.25*-this.radius,.1*this.radius),.25*this.radius,.25*this.radius),e.drawRect(new t(.5*-this.radius,.3*this.radius),.9*this.radius,.1*this.radius),e.drawRect(new t(.4*-this.radius,.4*-this.radius),.5*this.radius,.45*this.radius),e.setFill("rgba(0, 0, 0, 0.4)"),e.drawRect(new t(.4*-this.radius,.4*-this.radius),.5*this.radius,.45*this.radius),e.drawRect(new t(.5*-this.radius,.3*this.radius),.9*this.radius,.1*this.radius)}}class B extends u{name="SPORE";description="ZOMBIE FUNGUS THAT DEALS MODERATE DAMAGE";radius=10;moveSpeed=200;damage=20;primaryColor="#92b045";secondaryColor="rgba(170, 196, 104, 0.5)";outlineColor="#75912d";trailLength=4;renderTrail(e){e.setStroke("transparent",0),e.setFill(this.secondaryColor),e.drawArc(new t(0,0),this.radius+this.trailLength)}}class U extends w{isAutomatic=!0;rateOfFire=1500;reloadTime=2500;maxAmmo=1/0;ProjectileType=B;handOffsets=[new t(0,-2),new t(0,2)];ammo=this.maxAmmo;length=0;width=40;primaryColor="#75912d";render(e){e.setStroke("transparent"),e.setFill(this.primaryColor),e.drawArc(new t(40,0),this.width)}}class G extends h{damage=20;scoreValue=200;name="ABBERATION";description="YOUR WORST NIGHTMARE";moveSpeed=30;radius=70;maxHealth=5e3;health=this.maxHealth;weapon=new U(this);primaryColor="#723453";secondaryColor="#612452";constructor(){super(),this.weapon.isFiring=!0}}class K extends T{static coords=t.fromPercentage(50,80);static width=15;static height=200;render(e){if(d.localPlayer.weapon.isReloading){const t=K.height*d.localPlayer.weapon.reloadProgress,s=K.coords.shiftX(-t/2);e.setFont(20,"#ff0000"),e.drawTextWithOutline(K.coords.shiftY(30),"RELOADING"),e.setFill("#ff0000"),e.drawRect(s,t,K.width)}}}class j extends T{static coords=t.fromPercentage(2,5);render(e){e.setFont(25,"#ffffff","left"),e.drawTextWithOutline(j.coords,`SCORE: ${d.score.toString()}`)}}class N extends T{static coords=t.fromPercentage(98,95);render(e){const t=`${d.localPlayer.weapon.ammo}/${d.localPlayer.weapon.maxAmmo}`;e.setFont(25,d.localPlayer.weapon.isReloading?"#ff0000":"ffffff","right"),e.drawTextWithOutline(N.coords,t)}}class z extends T{static coords=t.fromPercentage(50,3);render(e){let t=0;d.bosses.forEach((s=>{const r=z.coords.shiftY(40*t),a=500*s.percentHealth,o=r.shiftX(-a/2),n=r.shiftY(10);e.setFill(i(s.percentHealth,0,120)),e.drawRect(o,a,20),e.setFont(18,"#000000"),e.drawText(n,s.health.toString()),e.setFont(30,i(s.percentHealth,0,120)),e.drawTextWithOutline(n.shiftY(40),s.name.toString()),t++}))}}class Z extends T{static coords=t.fromPercentage(50,70);static width=200;static height=75;get topLeft(){return Z.coords.shiftXY(-Z.width/2,-Z.height/2)}get bottomRight(){return Z.coords.shiftXY(Z.width/2,Z.height/2)}render(e){e.setStroke("#000000",2),e.setFill(this.isHovered?r:s),e.drawRect(this.topLeft,Z.width,Z.height),e.setFont(25,"#ffffff"),e.drawTextWithOutline(Z.coords,"RESTART")}isWithinBoundaries(e){return e.between(this.topLeft,this.bottomRight)}}class V extends c{layers={main:new e};eventListeners={mousedown:e=>this.handleMouseDown(e)};uiElements={restartButton:new Z};render(){this.layers.main.fill("#000000"),this.layers.main.setStroke("#000000"),this.layers.main.setFont(50,"#ff0000"),this.layers.main.drawText(t.fromPercentage(50,20),"GAME OVER"),this.layers.main.setFont(25,"#ffffff"),this.layers.main.drawText(t.fromPercentage(50,50),`YOUR FINAL SCORE: ${d.score}`),this.renderUiElements(this.layers.main)}handleMouseDown(e){this.uiElements.restartButton.isHovered&&d.setStage(new q)}}class $ extends c{layers={back:new e,main:new e,hud:new e};eventListeners={keydown:e=>this.handleKeyDown(e),keyup:e=>this.handleKeyUp(e),pointerdown:e=>this.handleMouseDown(e),pointerup:e=>this.handleMouseUp(e)};uiElements={inventoryIndicator:new L,healthIndicator:new O,reloadIndicator:new K,scoreIndicator:new j,ammoIndicator:new N,bossIndicator:new z};bossTimer=Date.now();constructor(){super(),d.zombies=new Set,d.powerups=new Set,d.explosions=new Set,d.bosses=new Set,d.projectiles=new Set,d.localPlayer,d.score=0}next(e){this.createZombies(e),this.createBosses(e),this.nextPlayers(e),this.nextZombies(e),this.nextProjectiles(e),this.nextPowerups(e),this.nextExplosions(e),d.localPlayer.isDead&&d.setStage(new V)}render(){this.layers.back.fill("#4dbd33"),d.projectiles.forEach((e=>e.renderRelative(this.layers.main))),d.players.forEach((e=>e.renderRelative(this.layers.main))),d.bosses.forEach((e=>e.renderRelative(this.layers.main))),d.zombies.forEach((e=>e.renderRelative(this.layers.main))),d.powerups.forEach((e=>e.renderRelative(this.layers.main))),d.explosions.forEach((e=>e.renderRelative(this.layers.main))),this.renderUiElements(this.layers.hud)}nextPlayers(e){d.players.forEach((t=>{t.isDead&&d.destroyPlayer(t),t.next(e)}))}nextZombies(e){d.zombies.forEach((t=>{t.isDead&&(d.destroyZombie(t),t instanceof h&&(this.bossTimer=Date.now()),this.createPowerups(t.coords)),t.next(e),d.players.forEach((e=>{t.collidesWith(e)&&(e.sufferDamage(t.damage),d.destroyZombie(t))}))}))}nextProjectiles(e){d.projectiles.forEach((t=>{t.next(e),t.targets.forEach((e=>{t.collidesWith(e)&&(e.sufferDamage(t.damage),d.destroyProjectile(t))}))}))}nextPowerups(e){d.powerups.forEach((e=>{d.players.forEach((t=>{e.collidesWith(t)&&(e.pickup(t),d.destroyPowerup(e))}))}))}nextExplosions(e){d.explosions.forEach((t=>{t.next(e),t.isFinished&&(d.players.forEach((e=>{t.collidesWith(e)&&e.sufferDamage(t.damage),d.zombies.forEach((e=>{t.collidesWith(e)&&e.sufferDamage(t.damage)}))})),d.destroyExplosion(t))}))}createBosses(e){if(Date.now()-this.bossTimer>=6e4){const e=new G;e.spawn(),d.zombies.add(e),d.bosses.add(e),this.bossTimer=1/0}}createZombies(e){const t=[v,A,F,H];for(const s of t)if(Math.random()<s.spawnRate*e){const e=new s;e.spawn(),d.zombies.add(e)}}createPowerups(e){const t=[b,X,I];for(const s of t)if(Math.random()<s.dropRate){const t=new s(e);d.powerups.add(t)}}handleKeyDown(t){"KeyW"===t.code?d.localPlayer.speed.y=-e.toPixels(d.localPlayer.moveSpeed):"KeyS"===t.code?d.localPlayer.speed.y=e.toPixels(d.localPlayer.moveSpeed):"KeyA"===t.code?d.localPlayer.speed.x=-e.toPixels(d.localPlayer.moveSpeed):"KeyD"===t.code?d.localPlayer.speed.x=e.toPixels(d.localPlayer.moveSpeed):"KeyR"===t.code?d.localPlayer.weapon.reload():"Space"===t.code&&null!==d.localPlayer.inventory&&d.localPlayer.inventory.activate(d.localPlayer)}handleKeyUp(e){"KeyW"===e.code?d.localPlayer.speed.y<0&&(d.localPlayer.speed.y=0):"KeyS"===e.code?d.localPlayer.speed.y>0&&(d.localPlayer.speed.y=0):"KeyA"===e.code?d.localPlayer.speed.x<0&&(d.localPlayer.speed.x=0):"KeyD"===e.code&&d.localPlayer.speed.x>0&&(d.localPlayer.speed.x=0)}handleMouseDown(e){d.localPlayer.weapon.fire(),d.localPlayer.weapon.isFiring=!0}handleMouseUp(e){d.localPlayer.weapon.isFiring=!1}}class q extends c{layers={main:new e};eventListeners={pointerdown:e=>this.handleClick(e)};playerSelectors=[];playerOptions=[new x,new g,new S];constructor(){super(),d.players=new Set;const e=t.fromPercentage(50,34);for(const t of this.playerOptions){const s=this.playerOptions.indexOf(t),r=e.shiftY(s*R.height);this.playerSelectors.push(new R(t,r)),this.uiElements[`player${s}`]=new R(t,r)}}render(){this.layers.main.fill("#000000"),this.layers.main.setFont(60,s),this.layers.main.drawText(t.fromPercentage(50,10),"SWARMED!"),this.layers.main.setFont(30,"#ffffff","center"),this.layers.main.drawText(t.fromPercentage(50,85),"SELECT A HERO TO START"),this.renderUiElements(this.layers.main)}handleClick(e){for(const e of this.playerSelectors)e.isHovered&&(d.players.add(e.player),d.localPlayer=e.player,d.setStage(new $))}}class J extends c{layers={main:new e};eventListeners={keydown:e=>this.handleKeyDown(e)};actors=[];constructor(){super();const e=new x;e.coords=new t(100,250);const s=new g;s.coords=new t(100,350);const r=new S;r.coords=new t(100,450);const i=new v;i.coords=new t(300,250);const a=new A;a.coords=new t(300,350);const o=new F;o.coords=new t(300,450);const n=new H;n.coords=new t(300,550);const l=new b(new t(500,250)),h=new X(new t(500,350)),d=new I(new t(500,450)),c=new G;c.coords=new t(700,250);const m=new W;m.coords=new t(900,250);const w=new p(e);w.coords=new t(1100,250);const u=new P(e);u.coords=new t(1100,350);const f=new B(e);f.coords=new t(1100,450);const y=new M(e);y.coords=new t(1100,550);const E=[e,s,r],T=[i,a,o,n,c],R=[l,h,d],C=[m],O=[w,u,f,y];this.actors=[...E,...T,...R,...C,...O]}render(){this.layers.main.fill("#ffffff"),this.layers.main.setFont(60,"#000000"),this.layers.main.drawText(t.fromPercentage(50,10),"TEST STAGE!");for(const e of this.actors)e.renderRelative(this.layers.main)}handleKeyDown(e){"F10"===e.code&&(e.preventDefault(),d.setStage(new q))}}let Q=Date.now();function _(){e.updateScaling();const t=document.querySelectorAll("canvas");for(const s of t)s.width=e.width,s.height=e.height;const s=document.getElementById("root");s.style.width=`${e.width}px`,s.style.height=`${e.height}px`}function ee(){const e=(Date.now()-Q)/1e3;d.stage.next(e),d.stage.clearLayers(),d.stage.render(),Q=Date.now(),requestAnimationFrame(ee)}addEventListener("resize",(function(){_()})),addEventListener("pointermove",(function(e){d.mousePosition=t.fromRealXY(e.offsetX,e.offsetY)})),addEventListener("pointerdown",(function(e){d.mousePosition=t.fromRealXY(e.offsetX,e.offsetY)})),addEventListener("load",(function(){d.setStage(new q),_(),requestAnimationFrame(ee)})),addEventListener("keydown",(function(e){"F10"!==e.code||d.stage instanceof J||d.setStage(new J)}));
//# sourceMappingURL=index.fdb844dd.js.map