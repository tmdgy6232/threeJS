import * as THREE from 'three'
import { WEBGL } from './webgl'

if (WEBGL.isWebGLAvailable()) {
    // 장면
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x004fff);

    // 카메라
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    //렌더러
    const renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);


    // 메쉬
    const geometry01 = new THREE.BoxGeometry(1,1,1);
    const material01 = new THREE.MeshBasicMaterial({color: 0x999999});

    const obj01 = new THREE.Mesh(geometry01, material01);
    obj01.position.x = -2;
    scene.add(obj01);

    const geometry02 = new THREE.ConeGeometry(1,2,32);
    const material02 = new THREE.MeshBasicMaterial({color: 0x999999});

    const obj02 = new THREE.Mesh(geometry02, material02);
    scene.add(obj02);

    const geometry03 = new THREE.IcosahedronGeometry(1,0);
    const material03 = new THREE.MeshBasicMaterial({color: 0x999999});

    const obj03 = new THREE.Mesh(geometry03, material03);
    obj03.position.x = 2;
    scene.add(obj03);


    function render(time) {
        time *= 0.0005;  // convert time to seconds
    
        
        obj01.rotation.y = time;
        
        obj02.rotation.y = time;
        
        obj03.rotation.y = time;
        renderer.render(scene, camera);
    
        requestAnimationFrame(render);
  }
  requestAnimationFrame(render);

  // 반응형처리
  function windowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }
  window.addEventListener('resize', windowResize);
} else {
  var warning = WEBGL.getWebGLErrorMessage()
  document.body.appendChild(warning)
}
