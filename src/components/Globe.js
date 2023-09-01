import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const Globe = React.forwardRef((props, ref) => {
  const globeContainerRef = useRef(null);
  let scene, camera, renderer, controls, globe, cityMarker;

  useEffect(() => {
    init();

    return () => {
      if (renderer) {
        renderer.dispose();
      }
      if (cityMarker) {
        if (cityMarker.geometry) {
          cityMarker.geometry.dispose();
        }
        if (cityMarker.material) {
          cityMarker.material.dispose();
        }
      }
    };
  }, []);

  const init = () => {
    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 3;

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    globeContainerRef.current.appendChild(renderer.domElement);

    controls = new OrbitControls(camera, renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);

    const material = new THREE.MeshPhongMaterial({
      color: 0x00aaff,
      shininess: 100,
    });

    const geometry = new THREE.SphereGeometry(1, 64, 64);
    globe = new THREE.Mesh(geometry, material);
    scene.add(globe);

    animate();
  };

  const animate = () => {
    requestAnimationFrame(animate);

    if (globe) {
      globe.rotation.y += 0.002;
    }

    controls.update();

    renderer.render(scene, camera);
  };

  // Function to update the city marker
  const updateMarker = (cities) => {
    if (cityMarker) {
      scene.remove(cityMarker);
      if (cityMarker.geometry) {
        cityMarker.geometry.dispose();
      }
      if (cityMarker.material) {
        cityMarker.material.dispose();
      }
    }

    if (cities && cities.length > 0) {
      cityMarker = new THREE.Group();

      cities.forEach((cityData) => {
        const markerGeometry = new THREE.SphereGeometry(0.03, 32, 32);
        const markerMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });

        const cityMarkerMesh = new THREE.Mesh(markerGeometry, markerMaterial);

        const phi = (90 - cityData.latitude) * (Math.PI / 180);
        const theta = (cityData.longitude + 180) * (Math.PI / 180);

        const x = Math.sin(phi) * Math.cos(theta);
        const y = Math.cos(phi);
        const z = Math.sin(phi) * Math.sin(theta);

        cityMarkerMesh.position.set(x, y, z);

        cityMarker.add(cityMarkerMesh);
      });

      scene.add(cityMarker);
    }
  };

  // Attach the updateMarker function to the ref passed from the parent component
  useEffect(() => {
    if (ref) {
      ref.current = { updateMarker };
    }
  }, [ref]);

  return (
    <div
      ref={globeContainerRef}
      className="globe-container"
      style={{ width: '100%', height: '400px' }}
    />
  );
});

export default Globe;
