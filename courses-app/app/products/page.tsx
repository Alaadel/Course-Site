import SearchProducts from "@/components/SearchProducts";
import SearchProductsContext from "@/store/SearchProductsContext";

export function Products() {
    return (
        <>
            <SearchProductsContext>
                <SearchProducts />
                <header>Showing {showCount} of {totalCount} products</header>
                
            </SearchProductsContext>
        </>
    );
}