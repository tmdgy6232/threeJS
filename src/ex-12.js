import * as THREE from 'three'
import { WEBGL } from './webgl'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

if (WEBGL.isWebGLAvailable()) {

  /**
   * 3차원 하늘공간 만들기
   * 
   * 1. 원리
   * 커다란 정육면체 안에서 바라보는 것은 이미지가 하늘이면 하늘을 바라보는 느낌을 준다.
   * 사이트 : https://opengameart.org/content/skiingpenguins-skybox-pack
   * 
   */

    // 장면
    const scene = new THREE.Scene();
    // scene.background = new THREE.Color(floorColor);

    const fov = 100; 

    const aspect = window.innerWidth / window.innerHeight;
    const near = 0.1;
    const far = 1000;
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

    camera.position.x = 0;
    camera.position.y = 5;
    camera.position.z = 10;

    camera.lookAt(new THREE.Vector3(0, 0, 0));

    const renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.minDistance = 20;
    controls.maxDistance = 200;
    controls.update();


    // axis helper 추가
    const axesHelper = new THREE.AxesHelper(5);
    scene.add(axesHelper);

   // sky 추가
   const skyMaterialArray = [];
   const texture_ft = new THREE.TextureLoader().load('../static/img/arid_ft.jpg');
   const texture_bk = new THREE.TextureLoader().load('../static/img/arid_bk.jpg');
   const texture_up = new THREE.TextureLoader().load('../static/img/arid_up.jpg');
   const texture_dn = new THREE.TextureLoader().load('../static/img/arid_dn.jpg');
   const texture_rt = new THREE.TextureLoader().load('../static/img/arid_rt.jpg');
   const texture_lf = new THREE.TextureLoader().load('../static/img/arid_lf.jpg');

    skyMaterialArray.push(new THREE.MeshStandardMaterial({ map: texture_ft }));
    skyMaterialArray.push(new THREE.MeshStandardMaterial({ map: texture_bk }));
    skyMaterialArray.push(new THREE.MeshStandardMaterial({ map: texture_up }));
    skyMaterialArray.push(new THREE.MeshStandardMaterial({ map: texture_dn }));
    skyMaterialArray.push(new THREE.MeshStandardMaterial({ map: texture_rt }));
    skyMaterialArray.push(new THREE.MeshStandardMaterial({ map: texture_lf }));

    // 반복문
    for(let i=0; i<6; i++) {
      skyMaterialArray[i].side = THREE.BackSide;
    }
   const skyGeometry = new THREE.BoxGeometry(1000, 1000, 1000);
  //  const skyMaterial = new THREE.MeshStandardMaterial({
  //   //color: 0xffffff,
  //   map: skyMaterialArray,
  //  })

   //skyMaterial.side = THREE.BackSide; // 어느 방향으로 material을 적용할지 결정
   const sky = new THREE.Mesh(skyGeometry, skyMaterialArray);
   scene.add(sky);
 
   // 빛
   const ambientlight = new THREE.AmbientLight(0xffffff, 1);
   scene.add(ambientlight);
    
    function animate() {
      requestAnimationFrame(animate);

      // required if conrols. enableDamping or controls.autoRotate are set to true
      controls.update();

      renderer.render(scene, camera);
    }
  animate();

  // 반응형처리
  function windowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    // 카메라의 속성값중 어떠한 값이라도 변경하고 적용하려면 이 함수를 호출해야한다.
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }
  window.addEventListener('resize', windowResize);
} else {
  var warning = WEBGL.getWebGLErrorMessage()
  document.body.appendChild(warning)
}
