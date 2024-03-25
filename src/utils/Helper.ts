export const decodeToken = (token: string) => {
  try{
    console.log(token)
  const tokenParts = token.split('.');
          if (tokenParts.length === 3) {
            const payload = JSON.parse(atob(tokenParts[1]));
            return payload;

          }
          return null;
        }
        catch(error){
          console.error(error)
        }
  }