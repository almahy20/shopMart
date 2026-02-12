"use server";

import { getuserToken } from "@/lib/auth";

export async function addcard(productId: string) {
  const token = await getuserToken();
  if (!token) {
    throw new Error("not token");
  }
  const respons = await fetch("https://ecommerce.routemisr.com/api/v1/cart", {
    method: "POST",
    body: JSON.stringify({ productId: productId }),
    headers: {
      token: token,
      "Content-Type": "application/json",
    },
  });
  const data = await respons.json();
  return data;
}
export async function getLoggeduserCart() {
  const token = await getuserToken();
  if (!token) {
    throw new Error("not token");
  }
  const respons = await fetch("https://ecommerce.routemisr.com/api/v1/cart", {
    headers: {
      token: token,
      "Content-Type": "application/json",
    },
  });
  const data = await respons.json();
  return data;
}
export async function DeleteCartItem(productId: string) {
  const token = await getuserToken();
  if (!token) {
    throw new Error("not token");
  }
  const respons = await fetch(
    `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
    {
      method: "DELETE",
      headers: {
        token: token,
        "Content-Type": "application/json",
      },
    },
  );
  const data = await respons.json();
  return data;
}
export async function UpdateCartProduct(productId: string, newcount: number) {
  const token = await getuserToken();
  if (!token) {
    throw new Error("not token");
  }
  const respons = await fetch(
    `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
    {
      method: "PUT",
      body: JSON.stringify({ productId: productId, count: newcount }),
      headers: {
        token: token,
        "Content-Type": "application/json",
      },
    },
  );
  const data = await respons.json();
  return data;
}
export async function ClearUserCart() {
  const token = await getuserToken();
  if (!token) {
    throw new Error("not token");
  }
  const respons = await fetch(`https://ecommerce.routemisr.com/api/v1/cart`, {
    method: "DELETE",
    headers: {
      token: token,
      "Content-Type": "application/json",
    },
  });
  const data = await respons.json();
  return data;
}
export async function GetAllBrands() {
  const token = await getuserToken();
  if (!token) {
    throw new Error("not token");
  }
  const respons = await fetch(`https://ecommerce.routemisr.com/api/v1/brands`, {
    method: "GET",
    headers: {
      token: token,
      "Content-Type": "application/json",
    },
  });
  const data = await respons.json();
  return data;
}
export async function GetAllCategories() {
  const respons = await fetch(
    `https://ecommerce.routemisr.com/api/v1/categories`,
    {
      cache: "no-store",
    },
  );
  const data = await respons.json();
  return data;
}

export async function getWishlist() {
  const token = await getuserToken();

  if (!token) {
    throw new Error("not token");
  }
  const response = await fetch(
    "https://ecommerce.routemisr.com/api/v1/wishlist",
    {
      method: "GET",
      headers: {
        token: token,
        "Content-Type": "application/json",
      },
    },
  );
  const data = await response.json();
  return data;
}

export async function addToWishlist(productId: string) {
  const token = await getuserToken();
  if (!token) {
    throw new Error("not token");
  }
  const response = await fetch(
    "https://ecommerce.routemisr.com/api/v1/wishlist",
    {
      body: JSON.stringify({ productId: productId }),

      method: "POST",
      headers: {
        token: token,
        "Content-Type": "application/json",
      },
    },
  );
  console.log(response, "dsads");

  return response.json();
}

export async function removeFromWishlist(productId: string) {
  const token = await getuserToken();

  if (!token) {
    throw new Error("not token");
  }
  const response = await fetch(
    `https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
    {
      method: "DELETE",
      headers: {
        token: token,
        "Content-Type": "application/json",
      },
    },
  );
  return response.json();
}

// export async function getAllOrders() {
//   const token = await getuserToken();

//   if (!token) {
//     throw new Error("not token");
//   }
//   const response = await fetch(
//     `https://ecommerce.routemisr.com/api/v1/orders/`,
//   );
//   return response.json();
// }

export async function CreateCashOrder(
  cartId: string,
  details: string,
  phone: string,
  city: string,
) {
  const token = await getuserToken();

  if (!token) {
    throw new Error("not token");
  }
  const response = await fetch(
    `https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,
    {
      body: JSON.stringify({
        shippingAddress: {
          details,
          phone,
          city,
        },
      }),

      method: "POST",
      headers: {
        token: token,
        "Content-Type": "application/json",
      },
    },
  );
  return response.json();
}
export async function UpdateLoggedUserPassword(
  currentPassword: string,
  password: string,
  rePassword: string,
) {
  const token = await getuserToken();

  if (!token) {
    throw new Error("not token");
  }
  const response = await fetch(
    `https://ecommerce.routemisr.com/api/v1/users/changeMyPassword`,
    {
      body: JSON.stringify({
        currentPassword,
        password,
        rePassword,
      }),

      method: "PUT",
      headers: {
        token: token,
        "Content-Type": "application/json",
      },
    },
  );
  return response.json();
}
export async function ForgotPassword(email: string) {
  const response = await fetch(
    `https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`,
    {
      body: JSON.stringify({
        email,
      }),
      method: "POST",
      headers: { "Content-Type": "application/json" },
    },
  );
  return response.json();
}
export async function VerifyResetCode(resetCode: string) {
  const response = await fetch(
    `https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`,
    {
      body: JSON.stringify({
        resetCode,
      }),

      method: "POST",
      headers: { "Content-Type": "application/json" },
    },
  );
  return response.json();
}

export async function getUserOrders(productId: string) {


  const response = await fetch(
    `https://ecommerce.routemisr.com/api/v1/orders/user/${productId}`,
  );
  return response.json();
}
