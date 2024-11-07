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
        antialias: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // 빛
    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(0, 2, 12);
    scene.add(pointLight);


    // 메쉬
    const geometry = new THREE.TorusGeometry(0.3, 0.15, 16, 40);

    // 1번 obj
    const material01 = new THREE.MeshStandardMaterial({color: 0xff7f00,
      metalness: 0.9,
      transparent: true,
      opacity: 0.5,
      roughness: 0.5,
      wireframe: true,
    });
    const obj01 = new THREE.Mesh(geometry, material01);
    obj01.position.x = -2;
    scene.add(obj01);

    // 2번 obj
    const material02 = new THREE.MeshStandardMaterial({color: 0xff7f00});
    const obj02 = new THREE.Mesh(geometry, material02);
    obj02.position.x = -1;
    scene.add(obj02);

    // 3번 obj
    const material03 = new THREE.MeshPhysicalMaterial({color: 0xff7f00, clearcoat: 1.0, clearcoatRoughness: 0.1});
    const obj03 = new THREE.Mesh(geometry, material03);
    obj03.position.x = 0;
    scene.add(obj03);

    // 4번 obj
    const material04 = new THREE.MeshLambertMaterial({color: 0xff7f00});
    const obj04 = new THREE.Mesh(geometry, material04);
    obj04.position.x = 1;
    scene.add(obj04);

    //5번 obj
    const material05 = new THREE.MeshPhongMaterial({color: 0xff7f00, shiness:60, specular:0xff7f00});
    const obj05 = new THREE.Mesh(geometry, material05);
    obj05.position.x = 2;
    scene.add(obj05);



    function render(time) {
        time *= 0.0005;  // convert time to seconds
    
        
        obj01.rotation.y = time;
        obj02.rotation.y = time;
        obj03.rotation.y = time;
        obj04.rotation.y = time;
        obj05.rotation.y = time;

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
