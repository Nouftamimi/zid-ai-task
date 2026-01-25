import { View, Text, ScrollView } from 'react-native';
import { useEffect, useState } from 'react';
import { styles } from './ProductViewStyle.styles';
import { getProducts } from '../domain/usecase/productUseCase';
import { productRepositoryImpl } from '../data/productRepositoryImpl';
import { Product } from '../domain/entities/Product';
import SearchBar from '@/src/component/SearchBar/SearchBar';
import ProductCard from '@/src/component/ProductCard/ProductCard';
import { useTranslation } from 'react-i18next';

export default function ProductView() {
    const [products, setProducts] = useState<Product[]>([]);
    const [filtered, setFiltered] = useState<Product[]>([]);
    const { t } = useTranslation();
    useEffect(() => {
        getProducts(productRepositoryImpl)().then(data => {
            setProducts(data);
            setFiltered(data); // show all initially
        });
    }, []);

    const handleSearch = (text: string) => {
        if (!text) {
            setFiltered(products);
            return;
        }

        const lower = text.toLowerCase();

        const result = products.filter(products =>
            products.id.toLowerCase().includes(lower) ||
            products.name.toLowerCase().includes(lower)
        );

        setFiltered(result);
    };

    const topSelling = [...filtered]
        .sort((a, b) => b.sold - a.sold)
        .slice(0, 5);

    return (
        <View style={styles.fullView}>
            <Text style={styles.title}>{t('Products')}</Text>

            {/* Search */}
            <SearchBar
                placeholder={t('searchOrders')}
                onSearch={handleSearch}
            />

            <ScrollView style={styles.container}>
                <View>

                    {/* Top Selling */}
                    <Text style={styles.section}>{t('TopSelling')}</Text>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        {topSelling.map(p => (
                            <ProductCard
                                key={p.id}
                                name={p.name}
                                price={p.price}
                                stock={p.stock}
                            />
                        ))}
                    </ScrollView>

                    {/* All Products */}
                    <Text style={[styles.section, { marginTop: 24 }]}>
                        {t('AllProducts')}
                    </Text>

                    {filtered.map(p => (
                        <ProductCard
                            key={p.id}
                            name={p.name}
                            price={p.price}
                            stock={p.stock}
                        />
                    ))}


                </View>
            </ScrollView>
        </View>
    );
}
