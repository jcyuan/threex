function PepperNode(name, scene){
	// handle structure
	this.name	= name
	this.parent	= null
	this.children	= []

	// update functions
	var onRenderFcts	= []
	this.update	= function(delta,now){
		onRenderFcts.forEach(function(onRenderFct){
			onRenderFct(delta, now)
		})
	}

	// visualisation build object3d
	var domElement	= document.createElement( 'img' );
	domElement.src	= 'css3d_molecules/images/ball.png';
	domElement.title= 'blabal'
	var object3d	= new THREE.CSS3DSprite( domElement );
	this.object3d	= object3d
	scene.add(object3d)
	// export position alias
	this.position	= object3d.position

	var css3DJoint		= null
	onRenderFcts.push(function(delta, now){
		if( css3DJoint === null )	return
		css3DJoint.update()
	}.bind(this))

	this.setParent	= function(newParent){
		if( css3DJoint )	scene.remove(css3DJoint.object3d)

		// remove this node from parent.children
		if( this.parent ){
			var index	= this.parent.children.indexOf(this)
			console.assert(index !== -1 )
			this.parent.children.splice(index, 1);
		}
		// update local parent reference
		this.parent	= newParent
		// add this node into newParent if any
		if( this.parent )	this.parent.children.push(this)
		// add a joint between this node and the parent
		if( this.parent ){
			css3DJoint	= new THREEx.CSS3DJoint(this.position, this.parent.position, 55)
			scene.add(css3DJoint.object3d)			
		}
	}


}

PepperNode.prototype.destroy	= function(){
}

//////////////////////////////////////////////////////////////////////////////////
//										//
//////////////////////////////////////////////////////////////////////////////////



//////////////////////////////////////////////////////////////////////////////////
//										//
//////////////////////////////////////////////////////////////////////////////////

PepperNode.prototype.addChildren= function(node){
	if( this.hasChildren(node) )	return
	node.setParent(this)
	this._children.push(node)
}
PepperNode.prototype.removeChildren= function(node){
	console.assert( this.hasChildren(node) )
	node.setParent(null)
}
PepperNode.prototype.hasChildren= function(node){
	return this._children.indexOf(node) !== -1 ? true : false
}
