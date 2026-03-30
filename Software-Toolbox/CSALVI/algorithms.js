const ALGORITHMS = {

  bubble: {
    name: "Bubble Sort",
    complexity: "O(n²)",
    explain: "Nested loops → n × n = n² operations",

    code: {
      python: `def bubble(arr):
  for i in range(len(arr)):
    for j in range(len(arr)-i-1):
      if arr[j] > arr[j+1]:
        arr[j],arr[j+1]=arr[j+1],arr[j]`,

      cpp: `void bubble(vector<int>& a){
 for(int i=0;i<a.size();i++)
  for(int j=0;j<a.size()-i-1;j++)
   if(a[j]>a[j+1]) swap(a[j],a[j+1]);
}`
    },

    run: async (arr, update) => {
      for(let i=0;i<arr.length;i++){
        for(let j=0;j<arr.length-i-1;j++){
          window.ops++;
          if(arr[j] > arr[j+1]){
            [arr[j],arr[j+1]]=[arr[j+1],arr[j]];
          }
          update(arr);
          await sleep();
        }
      }
    }
  },

  timsort: {
    name: "Timsort",
    complexity: "O(n log n)",
    explain: "Divide into runs + merge → log n levels × n work",

    code: {
      python: `def timsort(arr):
 return sorted(arr)`,

      cpp: `sort(arr.begin(), arr.end());`
    },

    run: async (arr, update) => {
      arr.sort((a,b)=>a-b); // simplified
      update(arr);
    }
  },

  binary: {
    name: "Binary Search",
    complexity: "O(log n)",
    explain: "Each step halves search space",

    code: {
      python: `def binary(arr,x):
 l,r=0,len(arr)-1
 while l<=r:
  m=(l+r)//2
  if arr[m]==x: return m
  elif arr[m]<x: l=m+1
  else: r=m-1`,

      cpp: `int binary(vector<int>& a,int x){
 int l=0,r=a.size()-1;
 while(l<=r){
  int m=(l+r)/2;
  if(a[m]==x) return m;
  else if(a[m]<x) l=m+1;
  else r=m-1;
 }
}`
    },

    run: async (arr, update) => {
      let x = arr[Math.floor(arr.length/2)];
      let l=0,r=arr.length-1;

      while(l<=r){
        let m=Math.floor((l+r)/2);
        window.ops++;

        if(arr[m]===x) break;
        else if(arr[m]<x) l=m+1;
        else r=m-1;

        update(arr, m);
        await sleep();
      }
    }
  }

};
