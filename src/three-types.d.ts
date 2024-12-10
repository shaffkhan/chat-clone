import { Object3DNode } from "@react-three/fiber";

declare module "@react-three/fiber" {
  interface ThreeElements {
    group: Object3DNode<THREE.Group, typeof THREE.Group>;
  }
}
