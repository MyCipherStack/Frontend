

    // Code template generators
   export const generateCodeTemplates = (meta) => {
        const generateJS = () => {
          const params = meta.parameters?.map(p => p.name).join(', ');
          return `function ${meta.name}(${params}) {\n  // your code here\n}`;
        };
    
        const generatePython = () => {
          const params = meta.parameters?.map(p => p.name).join(', ');
          return `def ${meta.name}(${params}):\n    # your code here`;
        };
    
        const generateJava = () => {
          const convertType = (type) => {
            switch (type) {
              case 'number': return 'int';
              case 'string': return 'String';
              case 'boolean': return 'boolean';
              default: return 'Object';
            }
          };
    
          const params = meta.parameters?.map(p => 
            `${convertType(p.type)} ${p.name}`
          ).join(', ');
          const returnType = convertType(meta.returnType);
          return `public ${returnType} ${meta.name}(${params}) {\n    // your code here\n}`;
        };
    
        const generateTypeScript = () => {
          const params = meta.parameters?.map(p => 
            `${p.name}: ${p.type || 'any'}`
          ).join(', ');
          return `function ${meta.name}(${params}): ${meta.returnType || 'void'} {\n  // your code here\n}`;
        };
    
        return {
          javascript: generateJS(),
          python: generatePython(),
          java: generateJava(),
          typescript: generateTypeScript()
        };
      };