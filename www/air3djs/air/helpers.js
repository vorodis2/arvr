export function rotationFromPoints(pos, target, downDir) {
    const {x, y, z} = new THREE.Vector3().subVectors(target, pos)
    return new THREE.Euler(
        0,
        Math.atan2(z, x),
        Math.atan2(y, Math.sqrt(x * x + z * z))
    )
}

export function setRotationFromPoints(obj, target, downPos) {
    obj.up.subVectors(obj.position, downPos)
    obj.lookAt(target)
}

export function rand(min, max) {
    return min + Math.random() * (max - min)
}