import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const slug = searchParams.get("slug");

    try {
        if (id) {
            // Ensure id is a valid number
            const product = await prisma.product.findUnique({
                where: { id: String(id) }, // Make sure to convert id to a number if necessary
            });

            if (!product) {
                return NextResponse.json(
                    { message: "Product not found" },
                    { status: 404 }
                );
            }
            return NextResponse.json(product, { status: 200 });
        } else if (slug) {
            // Fetch a single product by slug
            const product = await prisma.product.findUnique({
                where: { slug },
            });

            if (!product) {
                return NextResponse.json(
                    { message: "Product not found" },
                    { status: 404 }
                );
            }
            return NextResponse.json(product, { status: 200 });
        } else {
            // Fetch all products
            const products = await prisma.product.findMany();
            return NextResponse.json(products, { status: 200 });
        }
    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
        return NextResponse.json({ message: errorMessage }, { status: 500 });
    }
}

// export async function POST(request: NextRequest) {
//     try {
//         const body = await request.json();

//         const product = await prisma.product.create({
//             data: body,
//         });

//         return NextResponse.json(product, { status: 201 });
//     } catch (error: unknown) {
//         const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
//         return NextResponse.json({ message: errorMessage }, { status: 500 });
//     }
// }

// export async function PUT(request: NextRequest,) {
//     const { searchParams } = new URL(request.url);
//     const id = searchParams.get("id");

//     try {
//         if (!id) {
//             return NextResponse.json(
//                 { message: "Product ID is required" },
//                 { status: 400 }
//             );
//         }

//         const body = await request.json();

//         const product = await prisma.product.update({
//             where: { id },
//             data: body,
//         });

//         return NextResponse.json(product, { status: 200 });
//     } catch (error: unknown) {
//         const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
//         return NextResponse.json({ message: errorMessage }, { status: 500 });
//     }
// }

// export async function DELETE(request: NextRequest) {
//     const { searchParams } = new URL(request.url);
//     const id = searchParams.get("id");

//     try {
//         if (!id) {
//             return NextResponse.json(
//                 { message: "Product ID is required" },
//                 { status: 400 }
//             );
//         }

//         await prisma.product.delete({
//             where: { id },
//         });

//         return NextResponse.json(
//             { message: "Product deleted successfully" },
//             { status: 200 }
//         );
//     } catch (error: unknown) {
//         const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
//         return NextResponse.json({ message: errorMessage }, { status: 500 });
//     }
// }
