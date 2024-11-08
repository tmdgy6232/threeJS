import * as THREE from 'three'
import { WEBGL } from './webgl'

if (WEBGL.isWebGLAvailable()) {
    // 장면
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);

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


    // texture 추가
    const textureLoader = new THREE.TextureLoader();
    const textureBaseColor = textureLoader.load('../static/img/Leather_weave_002_basecolor.jpg');
    const textureNoamlMap = textureLoader.load('../static/img/Leather_weave_002_normal.jpg');
    const textureNomal = textureLoader.load('../static/img/Leather_weave_002_normal.jpg');
    const textureHeight = textureLoader.load('../static/img/Leather_weave_002_height.png');
    const textureRoughness = textureLoader.load('../static/img/Leather_weave_002_roughness.jpg');


    // 메쉬
    const geometry = new THREE.SphereGeometry(0.5,32,16);

    // 1번 obj
    const material01 = new THREE.MeshStandardMaterial({
      map: textureBaseColor,
    });
    const obj01 = new THREE.Mesh(geometry, material01);
    obj01.position.x = -2;
    scene.add(obj01);

    // 2번 obj
    const material02 = new THREE.MeshStandardMaterial({
      map: textureBaseColor,
      normalMap: textureNoamlMap,
    });
    const obj02 = new THREE.Mesh(geometry, material02);
    obj02.position.x = -1;
    scene.add(obj02);

    // 3번 obj
    const material03 = new THREE.MeshStandardMaterial({
      map: textureBaseColor,
      normalMap: textureNoamlMap,
      displacementMap: textureHeight,
      displacementScale: 0.1,
    });
    const obj03 = new THREE.Mesh(geometry, material03);
    obj03.position.x = 0;
    scene.add(obj03);

    // 4번 obj
    const material04 = new THREE.MeshStandardMaterial({
      map: textureBaseColor,
      normalMap: textureNoamlMap,
      displacementMap: textureHeight,
      displacementScale: 0.1,
      roughnessMap: textureRoughness,
      roughness: 0.5,
    });
    const obj04 = new THREE.Mesh(geometry, material04);
    obj04.position.x = 1;
    scene.add(obj04);



    function render(time) {
        time *= 0.0005;  // convert time to seconds
    
        
        // obj01.rotation.y = time;
        // obj02.rotation.y = time;
        // obj03.rotation.y = time;
        // obj04.rotation.y = time;

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
