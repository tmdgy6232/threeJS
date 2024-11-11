import * as THREE from 'three'
import { WEBGL } from './webgl'

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


    //렌더러
     /**
     * 그림자 표현을 위한 3단계
     * 1. Renderer의 shadowMap을 활성화
     * 2. 빛을 받아 그맂마를 표현할 물체와 그 그맂마를 받을 물체를 특정 코드로 설정
     * 3. 빛에 그림자 설정
     * 
     * castShadow - 그림자를 만들(표현할) 도형 : Object
     * receiveShadow - 그림자를 받아야 하는 도형 : 바닥
     * 
     * ambientlight는 그림자를 만들지 않음
     * rectLight는 그림자를 만들지 않음
     */

    const renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // rendere에 그림자를 쓰겠다.
    renderer.shadowMap.enabled = true;

    // 도형
    const geometry = new THREE.SphereGeometry(0.5, 32, 16);
    // const geometry = new THREE.IcosahedronGeometry(0.5,0);
    // const geometry = new THREE.ConeGeometry(0.4,0.7,6);

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
    // 카메라의 속성값중 어떠한 값이라도 변경하고 적용하려면 이 함수를 호출해야한다.
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }
  window.addEventListener('resize', windowResize);
} else {
  var warning = WEBGL.getWebGLErrorMessage()
  document.body.appendChild(warning)
}
