export default function toTreeData(data, id, parent) {
  let tree = []
  let resData = data

  for (let i = 0; i < resData.length; i++) {
    if (!resData[i][parent]) {
      let obj = resData[i];
      obj.children = []
      tree.push(obj);
      resData.splice(i, 1);
      i--;
    }
  }
  run(tree);

  function run(chiArr) {
    if (resData.length !== 0 && chiArr.length !== 0) {
      for (let i = 0; i < chiArr.length; i++) {
        for (let j = 0; j < resData.length; j++) {
          if (chiArr[i][id] === resData[j][parent]) {
            let obj = resData[j];
            obj.children = []
            chiArr[i].children.push(obj);
            resData.splice(j, 1);
            j--;
          }
        }
        run(chiArr[i].children);
      }
    }
  }
  return tree;
}
