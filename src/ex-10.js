import * as THREE from 'three'
import { WEBGL } from './webgl'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

if (WEBGL.isWebGLAvailable()) {
    // 장면
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);

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

    // rendere에 그림자를 쓰겠다.
    renderer.shadowMap.enabled = true;

    /**
     * OrbitControls 추가
     * 
     * 무조건 카메라 셋팅 이후에 추가해주어야 함.
     */
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.minDistance = 2; // 줌인 최소값 지정
    controls.maxDistance = 6; // 줌인 최댓값 지정
    controls.maxPolarAngle = Math.PI / 2; //  위아래로 움직일 수 있는 최대 각도 이렇게 하면 적당히 밑으로 가는걸 막아줌.
    controls.minPolarAngle = 1; //  위아래로 움직일 수 있는 최소 각도
    controls.update();



    // 도형
    const geometry = new THREE.ConeGeometry(1, 2, 16);
   
    // 1번 obj
    const material01 = new THREE.MeshStandardMaterial({
      color: 0x004fff,
    });
    const obj01 = new THREE.Mesh(geometry, material01);
    obj01.rotation.y = 0.5;
    obj01.position.y = 0.2;
    obj01.castShadow = true;
    scene.add(obj01);

    // add plate
    const plateGeometry = new THREE.PlaneGeometry(20, 20, 1, 1);
    const plateMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });

    const plane = new THREE.Mesh(plateGeometry, plateMaterial);
    plane.rotation.x = -0.5 * Math.PI;  // 방향을 반대로 하여 바닥면이 제대로 보이도록 설정
    plane.position.y = -0.5;            // 바닥면을 조금 더 아래로 이동하여 확인
    scene.add(plane);
    plane.receiveShadow = true;


    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(1, 1, 3);
    pointLight.castShadow = true;
    pointLight.shadow.mapSize.width = 1024; // 그림자의 해상도
    pointLight.shadow.mapSize.height = 1024; // 그림자의 해상도
    pointLight.shadow.radius = 6; // 그림자의 부드러움 정도

    const plLightHelper = new THREE.PointLightHelper(pointLight, 2, 0x000000);
    scene.add(pointLight)
    scene.add(plLightHelper);
    console.log(plLightHelper)
    
    function animate() {
      requestAnimationFrame(animate);

      // objcect rotate
      obj01.rotation.y += 0.01;

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