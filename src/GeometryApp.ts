/** CSci-4611 Example Code
 * Copyright 2023+ Regents of the University of Minnesota
 * Please do not distribute beyond the CSci-4611 course
 */

import { Texture } from '@gltf-transform/core';
import * as gfx from 'gophergfx'


export class GeometryApp extends gfx.GfxApp
{   
    private enableWireframe = true;
    private text : gfx.Mesh2;
    private player : gfx.Mesh2;
    //private raindrops = [];
 
    // --- Create the ExampleApp class ---
    constructor()
    {
        // initialize the base class gfx.GfxApp
        super();

    }


    // --- Initialize the graphics scene ---
    createScene(): void {
        let gl  = this.renderer.gl;

        // Add text to the scene
        this.text = gfx.Geometry2Factory.createRect(0.5, 0.5); 
        this.text.material.texture = new gfx.Text("I want",64,64,'25px Helvetica','red'); 
        this.text.material.color = gfx.Color.RED;
        //this.scene.add(this.text);
        //this.createWireframe(this.text);

        // Rectangle
        let rect = gfx.Geometry2Factory.createRect(1,1);
        //rect.material.color = gfx.Color.RED;
        rect.material.texture = new gfx.Texture("assets/sprites/player/player-simple-right.png");
        rect.position = new gfx.Vector2(-0.5, 0.5);
        rect.scale = new gfx.Vector2(0.5, 0.5);
        this.scene.add(rect);
        this.player = rect;
        this.player.rotation = 3.14/4;

        //this.createWireframe(rect);

        // Simple Triangle (front / back faces)
        // TODO: Create the simplest mesh
        let triangle = new gfx.Mesh2();
        triangle.material.drawMode = this.renderer.gl.TRIANGLES;
        const vertices: gfx.Vector2[] = [];
        vertices.push(new gfx.Vector2(0,0)); // v1
        vertices.push(new gfx.Vector2(1,1)); // v3
        vertices.push(new gfx.Vector2(1,0)); // v2
        triangle.setVertices(vertices);
        this.scene.add(triangle);
        this.createWireframe(triangle);

        /*const triangle = new gfx.Mesh2();
        triangle.material.drawMode = this.renderer.gl.TRIANGLES;
        const vertices: gfx.Vector2[] = [];
        vertices.push(new gfx.Vector2(0,0)); // v1
        vertices.push(new gfx.Vector2(1,0)); // v2
        vertices.push(new gfx.Vector2(1,1)); // v3
        triangle.setVertices(vertices);
        this.scene.add(triangle);*/

        // Circle
        let circle = gfx.Geometry2Factory.createCircle(0.5, 50);;
        circle.material.color = gfx.Color.RED;
        circle.position = new gfx.Vector2(0.5, 0.5);
        circle.scale = new gfx.Vector2(0.5, 0.5);
        circle.material.texture = new gfx.Texture("assets/sprites/player/player-simple-right.png");
        this.scene.add(circle);
        this.createWireframe(circle);

        // Pacman
        let pacman = gfx.Geometry2Factory.createPieSlice(0.5, Math.PI/4.0, 7.0*Math.PI/4.0, 0.2);
        pacman.material.color = gfx.Color.RED;
        pacman.position = new gfx.Vector2(-0.5, -0.5);
        pacman.scale = new gfx.Vector2(0.5, 0.5);
        //this.scene.add(pacman);
        //this.createWireframe(pacman);
        
        // Curve
        let curve = this.createCurve();
        curve.material.color = gfx.Color.RED;
        curve.position = new gfx.Vector2(0.5, -0.5);
        curve.scale = new gfx.Vector2(0.5, 0.35);
        this.scene.add(curve);
        this.createWireframe(curve);

        // Triangle Mesh
        let pumpkin = this.createPumpkinFace();
        pumpkin.material.color = gfx.Color.BLUE;
        pumpkin.scale = new gfx.Vector2(0.5, 0.35);
        //this.scene.add(pumpkin);
        //this.createWireframe(pumpkin);
    }

    

    // --- Update is called once each frame by the main graphics loop ---
    update(deltaTime: number): void {
        //this.text.position.y = this.text.position.y - deltaTime;
    }

    onKeyDown(event: KeyboardEvent): void {
        console.log(event);
        if (event.key == "ArrowLeft") {
            this.player.position.x -= 0.1;
            this.player.material.texture = new gfx.Texture("assets/sprites/player/player-simple-left.png");
        }
        else if (event.key == "ArrowRight") {
            this.player.position.x += 0.1;
            this.player.material.texture = new gfx.Texture("assets/sprites/player/player-simple-right.png");    
        }
    }

    createCurve(): Mesh2
    {
        const tristrip = new gfx.Mesh2();
        tristrip.material.drawMode = this.renderer.gl.TRIANGLE_STRIP;
        const verts: gfx.Vector2[] = [];
        const nSteps = 20;
        for (let n = 0; n <= nSteps; n++) {
            const fraction01 = n/nSteps;
            const x = -1 + 2 * fraction01;
            const angle = -Math.PI + 2 * Math.PI * fraction01;
            const y1 = (Math.cos(angle) + 1) / 2;
            verts.push(new gfx.Vector2(x, y1));
            const y2 = -y1;
            verts.push(new gfx.Vector2(x, y2));
            console.log(x + " " + angle + " " + y1);
        }
        tristrip.setVertices(verts);
        return tristrip;
    }

    createPumpkinFace(): Mesh2
    {
        const mesh = new gfx.Mesh2();
        mesh.material.drawMode = this.renderer.gl.TRIANGLES;
        const verts: gfx.Vector2[] = [];

        // Triangle 1
        verts.push(new gfx.Vector2(0-1,2));
        verts.push(new gfx.Vector2(-0.5-1,1));
        verts.push(new gfx.Vector2(0.5-1,1));

        // Triangle 2
        verts.push(new gfx.Vector2(0+1,2));
        verts.push(new gfx.Vector2(-0.5+1,1));
        verts.push(new gfx.Vector2(0.5+1,1));

        // Triangle 3
        verts.push(new gfx.Vector2(0,0+0.5));
        verts.push(new gfx.Vector2(-0.5,-1+0.5));
        verts.push(new gfx.Vector2(0.5,-1+0.5));

        // mouth
        verts.push(new gfx.Vector2(-2, 0.25-1.5));
        verts.push(new gfx.Vector2(-2, -0.25-1.5));
        verts.push(new gfx.Vector2(2, 0.25-1.5));
        verts.push(new gfx.Vector2(2, 0.25-1.5));
        verts.push(new gfx.Vector2(-2, -0.25-1.5));
        verts.push(new gfx.Vector2(2, -0.25-1.5));

        mesh.setVertices(verts);
        return mesh;
    }

    createWireframe(mesh : gfx.Mesh2): gfx.Line2 {
        const wireframe = new gfx.Line2(gfx.LineMode2.LINE_STRIP);
        const hex_verts: number[] = [];

        const verts = mesh.getVertices();

        if (mesh.material.drawMode == WebGL2RenderingContext.TRIANGLE_STRIP) {
            let lineVerts = []
            lineVerts.push(verts[0], verts[1]);
            lineVerts.push(verts[2], verts[3]);
            for (let i = 2; i < verts.length/2; i++) {
                lineVerts.push(verts[i*2], verts[i*2+1]);
                lineVerts.push(verts[(i-2)*2], verts[(i-2)*2 + 1]);
                lineVerts.push(verts[i*2], verts[i*2+1]);
            }
            wireframe.setVertices(lineVerts);
        }
        else if (mesh.material.drawMode == WebGL2RenderingContext.TRIANGLE_FAN) {
            let lineVerts = []
            lineVerts.push(verts[0], verts[1]);
            for (let i = 2; i < verts.length/2; i++) {
                lineVerts.push(verts[i*2], verts[i*2+1]);
                lineVerts.push(verts[(i-1)*2], verts[(i-1)*2+1]);
                lineVerts.push(verts[0], verts[1]);
            }
            wireframe.setVertices(lineVerts);
        }
        else if (mesh.material.drawMode == WebGL2RenderingContext.TRIANGLES) {
            wireframe.lineMode = gfx.LineMode2.LINES;
            let lineVerts = []
            for (let i = 0; i < verts.length/2; i+=3) {
                lineVerts.push(verts[i*2], verts[i*2+1]);
                lineVerts.push(verts[(i+1)*2], verts[(i+1)*2+1]);
                lineVerts.push(verts[(i+1)*2], verts[(i+1)*2+1]);
                lineVerts.push(verts[(i+2)*2], verts[(i+2)*2+1]);
                lineVerts.push(verts[(i+2)*2], verts[(i+2)*2+1]);
                lineVerts.push(verts[i*2], verts[i*2+1]);
            }
            wireframe.setVertices(lineVerts);
        }
        else {   
            wireframe.setVertices(verts);
        }
        
        wireframe.position = mesh.position;
        wireframe.scale = mesh.scale;
        wireframe.rotation = mesh.rotation;

        if (this.enableWireframe) {
            this.scene.add(wireframe);
        }

        return wireframe;
    }
}
