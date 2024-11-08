import * as THREE from 'three'
import { WEBGL } from './webgl'

if (WEBGL.isWebGLAvailable()) {
    // 장면
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);

    // 카메라
    // const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    // camera.position.z = 5;

    /**
     * 시야각, 화각 Filed of view
     * 표준 화각 47도
     * 망원 화각 8~28
     * 광각 화각 63~114
     * 렌즈의 종류: 광각렌즈, 표준렌즈, 망원렌즈
     * 렌즈의 종류에 따라 시야각이 다름
     */
    const fov = 75; 

    /**
     * Aspect Ratio(종횡비) 가로 세로 비율
     */
    const aspect = window.innerWidth / window.innerHeight;
    /**
     * Near : 카메라가 시작되는 위치
     * Far : 카메라가 끝나는 위치
     * near와 far 사이의 모든 객체가 렌더링 됨 그 외에 요소는 카메라에 잡히지 않음.
     */
    const near = 0.1;
    const far = 1000;
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

    // 카메라 위치조정(camera.position.set or camera.position.axis)
    camera.position.z = 5;

    // 카메라 바라보는 시점 조정(camera.lookAt)
    camera.lookAt(new THREE.Vector3(0, 0, 0));


    //렌더러
    const renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // 빛
    const pointLight = new THREE.PointLight(0xffffbb, 1);
    pointLight.position.set(0, 2, 12);
    scene.add(pointLight);

    // 도형
    const geometry = new THREE.BoxGeometry(1, 1, 1);

    // 1번 obj
    const material01 = new THREE.MeshStandardMaterial({
      color: 0xff7f00,
    });
    const obj01 = new THREE.Mesh(geometry, material01);
    obj01.rotation.y = 0.5;
    scene.add(obj01);


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
