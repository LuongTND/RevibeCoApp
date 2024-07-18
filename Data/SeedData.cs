using EcomerceApp.Models;
using Microsoft.AspNetCore.Identity;
using System;
using static Org.BouncyCastle.Asn1.Cmp.Challenge;

namespace EcomerceApp.Data
{
    public class SeedData
    {
        public static void Initialize(ApplicationDbContext context)
        {
            System.Random random = new System.Random();

            if (!context.ProductCategories.Any())
            {
                context.AddRange(
                    new ProductCategory
                    {
                        Name = "Sáp thơm",
                        Products = new List<Product>{
                            new Product{
                                Name = "Amber Mun",
                                Description = "Sáp thơm hoa trà nước hoa là một hòa quyện tinh tế giữa hương thơm dịu dàng của hoa trà và sự tinh tế của sáp thơm. Mỗi viên sáp đều chứa đựng một cảm xúc, một hình ảnh hoa trà nở rộ trong ánh nắng chiều, lan tỏa một hương thơm thanh khiết, dịu dàng và quyến rũ.\r\nKhi bạn cháy sáp, từng giọt hương thơm nhẹ nhàng lan tỏa, lấp đầy không gian với một bản hòa âm dịu dàng, mang lại cảm giác thư thái, êm dịu và lạc quan. Hương thơm của hoa trà nước hoa không chỉ là sự kết hợp hoàn hảo giữa sự tươi mới của hoa và đất, mà còn là một lời tri ân đến vẻ đẹp tự nhiên và sự tinh tế của cuộc sống.\r\n",
                                Information = "Trọng lượng: 50G.\r\nNguyên liệu: Làm từ tinh dầu thiên nhiên nguyên chất và thạch cao.\r\nThời gian lưu hương: 20-30 ngày.\r\nKích thước hộp: 16.5x10.5cm.\r\nHạn sử dụng: 3 năm kể từ ngày sản xuất.\r\nTốc độ tỏa mùi nhanh, bung tỏa hương thơm chỉ trong giây lát\r\n",
                                Price = 30000,
                                Quantity = GenerateRandomQuantity(random),
                                ProductImages = new List<ProductImage>{
                                    new ProductImage{
                                        ImageUrl = "https://i.imgur.com/GRWuC6K.jpg"
                                    },
                                    new ProductImage{
                                        ImageUrl = "https://i.imgur.com/9kK4JLF.jpg"
                                    },
                                    new ProductImage{
                                        ImageUrl = "https://i.imgur.com/mh8t0K2.jpg"
                                    },
                                    new ProductImage{
                                        ImageUrl = "https://i.imgur.com/BOVg2DY.jpg"
                                    },

                                }
                            },
                            new Product{
                                Name = "Freesia",
                                Description = "Sáp thơm hoa trà nước hoa là một hòa quyện tinh tế giữa hương thơm dịu dàng của hoa trà và sự tinh tế của sáp thơm. Mỗi viên sáp đều chứa đựng một cảm xúc, một hình ảnh hoa trà nở rộ trong ánh nắng chiều, lan tỏa một hương thơm thanh khiết, dịu dàng và quyến rũ.\r\nKhi bạn cháy sáp, từng giọt hương thơm nhẹ nhàng lan tỏa, lấp đầy không gian với một bản hòa âm dịu dàng, mang lại cảm giác thư thái, êm dịu và lạc quan. Hương thơm của hoa trà nước hoa không chỉ là sự kết hợp hoàn hảo giữa sự tươi mới của hoa và đất, mà còn là một lời tri ân đến vẻ đẹp tự nhiên và sự tinh tế của cuộc sống.\r\n",
                                Information = "Trọng lượng: 50G.\r\nNguyên liệu: Làm từ tinh dầu thiên nhiên nguyên chất và thạch cao.\r\nThời gian lưu hương: 20-30 ngày.\r\nKích thước hộp: 16.5x10.5cm.\r\nHạn sử dụng: 3 năm kể từ ngày sản xuất.\r\nTốc độ tỏa mùi nhanh, bung tỏa hương thơm chỉ trong giây lát\r\n",
                                Price = 30000,
                                Quantity = GenerateRandomQuantity(random),
                                ProductImages = new List<ProductImage>{
                                     new ProductImage{
                                        ImageUrl = "https://i.imgur.com/Z3UAEDs.jpg"
                                    },
                                    new ProductImage{
                                        ImageUrl = "https://i.imgur.com/9kK4JLF.jpg"
                                    },
                                    new ProductImage{
                                        ImageUrl = "https://i.imgur.com/mh8t0K2.jpg"
                                    },
                                    new ProductImage{
                                        ImageUrl = "https://i.imgur.com/BOVg2DY.jpg"
                                    },


                                }
                            },
                            new Product{
                                Name = "Gardenia",
                                Description = "Sáp thơm hoa trà nước hoa là một hòa quyện tinh tế giữa hương thơm dịu dàng của hoa trà và sự tinh tế của sáp thơm. Mỗi viên sáp đều chứa đựng một cảm xúc, một hình ảnh hoa trà nở rộ trong ánh nắng chiều, lan tỏa một hương thơm thanh khiết, dịu dàng và quyến rũ.\r\nKhi bạn cháy sáp, từng giọt hương thơm nhẹ nhàng lan tỏa, lấp đầy không gian với một bản hòa âm dịu dàng, mang lại cảm giác thư thái, êm dịu và lạc quan. Hương thơm của hoa trà nước hoa không chỉ là sự kết hợp hoàn hảo giữa sự tươi mới của hoa và đất, mà còn là một lời tri ân đến vẻ đẹp tự nhiên và sự tinh tế của cuộc sống.\r\n",
                                Information = "Trọng lượng: 50G.\r\nNguyên liệu: Làm từ tinh dầu thiên nhiên nguyên chất và thạch cao.\r\nThời gian lưu hương: 20-30 ngày.\r\nKích thước hộp: 16.5x10.5cm.\r\nHạn sử dụng: 3 năm kể từ ngày sản xuất.\r\nTốc độ tỏa mùi nhanh, bung tỏa hương thơm chỉ trong giây lát\r\n",
                                Price = 30000,
                                Quantity = GenerateRandomQuantity(random),
                                ProductImages = new List<ProductImage>{
                                    new ProductImage{
                                        ImageUrl = "https://i.imgur.com/fEIHxYO.jpg"
                                    },
                                     new ProductImage{
                                        ImageUrl = "https://i.imgur.com/9kK4JLF.jpg"
                                    },
                                    new ProductImage{
                                        ImageUrl = "https://i.imgur.com/mh8t0K2.jpg"
                                    },
                                    new ProductImage{
                                        ImageUrl = "https://i.imgur.com/BOVg2DY.jpg"
                                    },

                                }
                            },
                            new Product{
                                Name = "Bluebell",
                                Description = "Sáp thơm hoa trà nước hoa là một hòa quyện tinh tế giữa hương thơm dịu dàng của hoa trà và sự tinh tế của sáp thơm. Mỗi viên sáp đều chứa đựng một cảm xúc, một hình ảnh hoa trà nở rộ trong ánh nắng chiều, lan tỏa một hương thơm thanh khiết, dịu dàng và quyến rũ.\r\nKhi bạn cháy sáp, từng giọt hương thơm nhẹ nhàng lan tỏa, lấp đầy không gian với một bản hòa âm dịu dàng, mang lại cảm giác thư thái, êm dịu và lạc quan. Hương thơm của hoa trà nước hoa không chỉ là sự kết hợp hoàn hảo giữa sự tươi mới của hoa và đất, mà còn là một lời tri ân đến vẻ đẹp tự nhiên và sự tinh tế của cuộc sống.\r\n",
                                Information = "Trọng lượng: 50G.\r\nNguyên liệu: Làm từ tinh dầu thiên nhiên nguyên chất và thạch cao.\r\nThời gian lưu hương: 20-30 ngày.\r\nKích thước hộp: 16.5x10.5cm.\r\nHạn sử dụng: 3 năm kể từ ngày sản xuất.\r\nTốc độ tỏa mùi nhanh, bung tỏa hương thơm chỉ trong giây lát\r\n",
                                Price = 30000,
                                Quantity = GenerateRandomQuantity(random),
                                ProductImages = new List<ProductImage>{
                                    new ProductImage{
                                        ImageUrl = "https://i.imgur.com/5S7gG0U.jpg"
                                    },
                                    new ProductImage{
                                        ImageUrl = "https://i.imgur.com/9kK4JLF.jpg"
                                    },
                                    new ProductImage{
                                        ImageUrl = "https://i.imgur.com/mh8t0K2.jpg"
                                    },
                                    new ProductImage{
                                        ImageUrl = "https://i.imgur.com/BOVg2DY.jpg"
                                    },
                                }
                            },
                            new Product{
                                Name = "Trà trắng",
                                Description = "Sáp thơm hoa trà nước hoa là một hòa quyện tinh tế giữa hương thơm dịu dàng của hoa trà và sự tinh tế của sáp thơm. Mỗi viên sáp đều chứa đựng một cảm xúc, một hình ảnh hoa trà nở rộ trong ánh nắng chiều, lan tỏa một hương thơm thanh khiết, dịu dàng và quyến rũ.\r\nKhi bạn cháy sáp, từng giọt hương thơm nhẹ nhàng lan tỏa, lấp đầy không gian với một bản hòa âm dịu dàng, mang lại cảm giác thư thái, êm dịu và lạc quan. Hương thơm của hoa trà nước hoa không chỉ là sự kết hợp hoàn hảo giữa sự tươi mới của hoa và đất, mà còn là một lời tri ân đến vẻ đẹp tự nhiên và sự tinh tế của cuộc sống.\r\n",
                                Information = "Trọng lượng: 50G.\r\nNguyên liệu: Làm từ tinh dầu thiên nhiên nguyên chất và thạch cao.\r\nThời gian lưu hương: 20-30 ngày.\r\nKích thước hộp: 16.5x10.5cm.\r\nHạn sử dụng: 3 năm kể từ ngày sản xuất.\r\nTốc độ tỏa mùi nhanh, bung tỏa hương thơm chỉ trong giây lát\r\n",
                                Price = 30000,
                                Quantity = GenerateRandomQuantity(random),
                                ProductImages = new List<ProductImage>{
                                    new ProductImage{
                                        ImageUrl = "https://i.imgur.com/iiM84ej.jpg"
                                    },
                                    new ProductImage{
                                        ImageUrl = "https://i.imgur.com/9kK4JLF.jpg"
                                    },
                                    new ProductImage{
                                        ImageUrl = "https://i.imgur.com/mh8t0K2.jpg"
                                    },
                                    new ProductImage{
                                        ImageUrl = "https://i.imgur.com/BOVg2DY.jpg"
                                    },
                                }
                            }

                        }
                    },
                    new ProductCategory
                    {
                        Name = "Viên Đá Hoa Anh Đào",
                        Products = new List<Product> {
                            new Product{
                                Name = "Blue Wind Chime",
                                Description = "Sáp thơm hoa trà nước hoa là một hòa quyện tinh tế giữa hương thơm dịu dàng của hoa trà và sự tinh tế của sáp thơm. Mỗi viên sáp đều chứa đựng một cảm xúc, một hình ảnh hoa trà nở rộ trong ánh nắng chiều, lan tỏa một hương thơm thanh khiết, dịu dàng và quyến rũ.\r\nKhi bạn cháy sáp, từng giọt hương thơm nhẹ nhàng lan tỏa, lấp đầy không gian với một bản hòa âm dịu dàng, mang lại cảm giác thư thái, êm dịu và lạc quan. Hương thơm của hoa trà nước hoa không chỉ là sự kết hợp hoàn hảo giữa sự tươi mới của hoa và đất, mà còn là một lời tri ân đến vẻ đẹp tự nhiên và sự tinh tế của cuộc sống.\r\n",
                                Information = "Trọng lượng: 50G.\r\nNguyên liệu: Làm từ tinh dầu thiên nhiên nguyên chất và thạch cao.\r\nThời gian lưu hương: 20-30 ngày.\r\nKích thước hộp: 16.5x10.5cm.\r\nHạn sử dụng: 3 năm kể từ ngày sản xuất.\r\nTốc độ tỏa mùi nhanh, bung tỏa hương thơm chỉ trong giây lát\r\n",
                                Price = 30000,
                                Quantity = GenerateRandomQuantity(random),
                                ProductImages = new List<ProductImage>{
                                    new ProductImage{
                                        ImageUrl = "https://i.imgur.com/Fg7CRBc.jpg"
                                    },
                                    new ProductImage{
                                        ImageUrl = "https://i.imgur.com/mIcnZiG.jpg"
                                    },
                                    new ProductImage{
                                        ImageUrl = "https://i.imgur.com/uDcR5PR.jpg"
                                    },
                                    new ProductImage{
                                        ImageUrl = "https://i.imgur.com/X3hUMML.jpg"
                                    },
                                    new ProductImage{
                                        ImageUrl = "https://i.imgur.com/7xUs09e.jpg"
                                    },
                                    new ProductImage{
                                        ImageUrl = "https://i.imgur.com/Dqmmn6J.jpg"
                                    },
                                    new ProductImage{
                                        ImageUrl = "https://i.imgur.com/SRfFHcp.jpg"
                                    },
                                    new ProductImage{
                                        ImageUrl = "https://i.imgur.com/oNLBchk.jpg"
                                    }
                                }
                            },
                            new Product{
                                Name = "White Peach Olong",
                                Description = "Sáp thơm hoa trà nước hoa là một hòa quyện tinh tế giữa hương thơm dịu dàng của hoa trà và sự tinh tế của sáp thơm. Mỗi viên sáp đều chứa đựng một cảm xúc, một hình ảnh hoa trà nở rộ trong ánh nắng chiều, lan tỏa một hương thơm thanh khiết, dịu dàng và quyến rũ.\r\nKhi bạn cháy sáp, từng giọt hương thơm nhẹ nhàng lan tỏa, lấp đầy không gian với một bản hòa âm dịu dàng, mang lại cảm giác thư thái, êm dịu và lạc quan. Hương thơm của hoa trà nước hoa không chỉ là sự kết hợp hoàn hảo giữa sự tươi mới của hoa và đất, mà còn là một lời tri ân đến vẻ đẹp tự nhiên và sự tinh tế của cuộc sống.\r\n",
                                Information = "Trọng lượng: 50G.\r\nNguyên liệu: Làm từ tinh dầu thiên nhiên nguyên chất và thạch cao.\r\nThời gian lưu hương: 20-30 ngày.\r\nKích thước hộp: 16.5x10.5cm.\r\nHạn sử dụng: 3 năm kể từ ngày sản xuất.\r\nTốc độ tỏa mùi nhanh, bung tỏa hương thơm chỉ trong giây lát\r\n",
                                Price = 30000,
                                Quantity = GenerateRandomQuantity(random),
                                ProductImages = new List<ProductImage>{
                                     new ProductImage{
                                        ImageUrl = "https://i.imgur.com/JNc7PSk.jpg"
                                    },
                                    new ProductImage{
                                        ImageUrl = "https://i.imgur.com/mIcnZiG.jpg"
                                    },
                                    new ProductImage{
                                        ImageUrl = "https://i.imgur.com/uDcR5PR.jpg"
                                    },
                                    new ProductImage{
                                        ImageUrl = "https://i.imgur.com/X3hUMML.jpg"
                                    },
                                    new ProductImage{
                                        ImageUrl = "https://i.imgur.com/7xUs09e.jpg"
                                    },
                                    new ProductImage{
                                        ImageUrl = "https://i.imgur.com/Dqmmn6J.jpg"
                                    },
                                    new ProductImage{
                                        ImageUrl = "https://i.imgur.com/SRfFHcp.jpg"
                                    },
                                    new ProductImage{
                                        ImageUrl = "https://i.imgur.com/oNLBchk.jpg"
                                    }
                                }
                            },
                            new Product{
                                Name = "British pear & Freesia",
                                Description = "Sáp thơm hoa trà nước hoa là một hòa quyện tinh tế giữa hương thơm dịu dàng của hoa trà và sự tinh tế của sáp thơm. Mỗi viên sáp đều chứa đựng một cảm xúc, một hình ảnh hoa trà nở rộ trong ánh nắng chiều, lan tỏa một hương thơm thanh khiết, dịu dàng và quyến rũ.\r\nKhi bạn cháy sáp, từng giọt hương thơm nhẹ nhàng lan tỏa, lấp đầy không gian với một bản hòa âm dịu dàng, mang lại cảm giác thư thái, êm dịu và lạc quan. Hương thơm của hoa trà nước hoa không chỉ là sự kết hợp hoàn hảo giữa sự tươi mới của hoa và đất, mà còn là một lời tri ân đến vẻ đẹp tự nhiên và sự tinh tế của cuộc sống.\r\n",
                                Information = "Trọng lượng: 50G.\r\nNguyên liệu: Làm từ tinh dầu thiên nhiên nguyên chất và thạch cao.\r\nThời gian lưu hương: 20-30 ngày.\r\nKích thước hộp: 16.5x10.5cm.\r\nHạn sử dụng: 3 năm kể từ ngày sản xuất.\r\nTốc độ tỏa mùi nhanh, bung tỏa hương thơm chỉ trong giây lát\r\n",
                                Price = 30000,
                                Quantity = GenerateRandomQuantity(random),
                                ProductImages = new List<ProductImage>{
                                    new ProductImage{
                                        ImageUrl = "https://i.imgur.com/J5j9tOo.jpg"
                                    },
                                    new ProductImage{
                                        ImageUrl = "https://i.imgur.com/mIcnZiG.jpg"
                                    },
                                    new ProductImage{
                                        ImageUrl = "https://i.imgur.com/uDcR5PR.jpg"
                                    },
                                    new ProductImage{
                                        ImageUrl = "https://i.imgur.com/X3hUMML.jpg"
                                    },
                                    new ProductImage{
                                        ImageUrl = "https://i.imgur.com/7xUs09e.jpg"
                                    },
                                    new ProductImage{
                                        ImageUrl = "https://i.imgur.com/Dqmmn6J.jpg"
                                    },
                                    new ProductImage{
                                        ImageUrl = "https://i.imgur.com/SRfFHcp.jpg"
                                    },
                                    new ProductImage{
                                        ImageUrl = "https://i.imgur.com/oNLBchk.jpg"
                                    }
                                }
                            },
                            new Product{
                                Name = "Westin White Tea",
                                Description = "Sáp thơm hoa trà nước hoa là một hòa quyện tinh tế giữa hương thơm dịu dàng của hoa trà và sự tinh tế của sáp thơm. Mỗi viên sáp đều chứa đựng một cảm xúc, một hình ảnh hoa trà nở rộ trong ánh nắng chiều, lan tỏa một hương thơm thanh khiết, dịu dàng và quyến rũ.\r\nKhi bạn cháy sáp, từng giọt hương thơm nhẹ nhàng lan tỏa, lấp đầy không gian với một bản hòa âm dịu dàng, mang lại cảm giác thư thái, êm dịu và lạc quan. Hương thơm của hoa trà nước hoa không chỉ là sự kết hợp hoàn hảo giữa sự tươi mới của hoa và đất, mà còn là một lời tri ân đến vẻ đẹp tự nhiên và sự tinh tế của cuộc sống.\r\n",
                                Information = "Trọng lượng: 50G.\r\nNguyên liệu: Làm từ tinh dầu thiên nhiên nguyên chất và thạch cao.\r\nThời gian lưu hương: 20-30 ngày.\r\nKích thước hộp: 16.5x10.5cm.\r\nHạn sử dụng: 3 năm kể từ ngày sản xuất.\r\nTốc độ tỏa mùi nhanh, bung tỏa hương thơm chỉ trong giây lát\r\n",
                                Price = 30000,
                                Quantity = GenerateRandomQuantity(random),
                                ProductImages = new List<ProductImage>{
                                    new ProductImage{
                                        ImageUrl = "https://i.imgur.com/YTSre7C.jpg"
                                    },
                                    new ProductImage{
                                        ImageUrl = "https://i.imgur.com/mIcnZiG.jpg"
                                    },
                                    new ProductImage{
                                        ImageUrl = "https://i.imgur.com/uDcR5PR.jpg"
                                    },
                                    new ProductImage{
                                        ImageUrl = "https://i.imgur.com/X3hUMML.jpg"
                                    },
                                    new ProductImage{
                                        ImageUrl = "https://i.imgur.com/7xUs09e.jpg"
                                    },
                                    new ProductImage{
                                        ImageUrl = "https://i.imgur.com/Dqmmn6J.jpg"
                                    },
                                    new ProductImage{
                                        ImageUrl = "https://i.imgur.com/SRfFHcp.jpg"
                                    },
                                    new ProductImage{
                                        ImageUrl = "https://i.imgur.com/oNLBchk.jpg"
                                    }
                                }
                            },
                        }
                    },
                    new ProductCategory
                    {
                        Name = "Nến thơm",
                        Products = new List<Product>
                        {
                            new Product{
                                Name = "Hộp 4 nến thơm",
                                Description = "Nến thơm không chỉ là một nguồn ánh sáng ấm áp mà còn là một phương tiện để tạo không gian thơm dịu và thư giãn. Mỗi chiếc nến mang theo một câu chuyện riêng, từng giọt sáp tan chảy là một khoảnh khắc của hương thơm êm dịu tràn ngập không gian.\r\nHương thơm từ nến thơm có thể đa dạng, từ những hương trái cây tươi mới, đến những hương hoa nồng nàn hay những hương gỗ ấm áp. Khi nến được đốt, hương thơm dịu nhẹ lan tỏa, tạo ra một bản hòa âm đầy quyến rũ cho không gian xung quanh.\r\nNến thơm không chỉ làm cho không gian trở nên ấm áp và lãng mạn hơn, mà còn có thể giúp giảm căng thẳng và lo lắng, tạo ra một môi trường thư giãn và yên bình. Với nến thơm, mỗi không gian trở nên đặc biệt hơn, mỗi khoảnh khắc trở nên đáng nhớ hơn, tạo ra những trải nghiệm tuyệt vời cho mọi người.\r\n",
                                Information = "Trọng lượng: 30gr/c\r\nNguyên liệu: Sáp đậu nành cao cấp.\r\nKích thước hộp:\r\n+ Hộp 4chiếc: 7x7x4\r\n+ Hộp 1c: 6x6x3\r\nHạn sử dụng: 3 năm kể từ ngày sản xuất\r\nTốc độ tỏa mùi nhanh, bung tỏa hương thơm chỉ trong giây lát\r\nCÔNG DỤNG:\r\n- Nến toả hương thơm ngay cả khi chưa đốt, khử mùi hôi, ẩm mốc trong không gian.\r\n- Nến giải tỏa stress, căng thẳng, mệt mỏi, tăng khả năng tập trung.\r\n- Nến tăng cường kháng khuẩn trong không khí.\r\n",
                                Price = 30000,
                                Quantity = GenerateRandomQuantity(random),
                                ProductImages = new List<ProductImage>{
                                    new ProductImage{
                                        ImageUrl = "https://i.imgur.com/Cks5JSj.jpg"
                                    },
                                    new ProductImage{
                                        ImageUrl = "https://i.imgur.com/uVj3Z9q.jpg"
                                    },
                                }
                            },
                            new Product{
                                Name = "Hộp 1 nến thơm",
                                Description = "Nến thơm không chỉ là một nguồn ánh sáng ấm áp mà còn là một phương tiện để tạo không gian thơm dịu và thư giãn. Mỗi chiếc nến mang theo một câu chuyện riêng, từng giọt sáp tan chảy là một khoảnh khắc của hương thơm êm dịu tràn ngập không gian.\r\nHương thơm từ nến thơm có thể đa dạng, từ những hương trái cây tươi mới, đến những hương hoa nồng nàn hay những hương gỗ ấm áp. Khi nến được đốt, hương thơm dịu nhẹ lan tỏa, tạo ra một bản hòa âm đầy quyến rũ cho không gian xung quanh.\r\nNến thơm không chỉ làm cho không gian trở nên ấm áp và lãng mạn hơn, mà còn có thể giúp giảm căng thẳng và lo lắng, tạo ra một môi trường thư giãn và yên bình. Với nến thơm, mỗi không gian trở nên đặc biệt hơn, mỗi khoảnh khắc trở nên đáng nhớ hơn, tạo ra những trải nghiệm tuyệt vời cho mọi người.\r\n",
                                Information = "Trọng lượng: 30gr/c\r\nNguyên liệu: Sáp đậu nành cao cấp.\r\nKích thước hộp:\r\n+ Hộp 4chiếc: 7x7x4\r\n+ Hộp 1c: 6x6x3\r\nHạn sử dụng: 3 năm kể từ ngày sản xuất\r\nTốc độ tỏa mùi nhanh, bung tỏa hương thơm chỉ trong giây lát\r\nCÔNG DỤNG:\r\n- Nến toả hương thơm ngay cả khi chưa đốt, khử mùi hôi, ẩm mốc trong không gian.\r\n- Nến giải tỏa stress, căng thẳng, mệt mỏi, tăng khả năng tập trung.\r\n- Nến tăng cường kháng khuẩn trong không khí.\r\n",
                                Price = 30000,
                                Quantity = GenerateRandomQuantity(random),
                                ProductImages = new List<ProductImage>{
                                    new ProductImage{
                                        ImageUrl = "https://i.imgur.com/7RfPkeO.jpg"
                                    },
                                    new ProductImage{
                                        ImageUrl = "https://i.imgur.com/yUDeF7Q.jpg"
                                    },
                                    new ProductImage{
                                        ImageUrl = "https://i.imgur.com/uVj3Z9q.jpg"
                                    }
                                }
                            },
                        }
                    },
                    new ProductCategory
                    {
                        Name = "Hairclip",
                        Products = new List<Product>
                        {
                             new Product{
                                Name = "Hairclip 11cm",
                                Description = "Nến thơm không chỉ là một nguồn ánh sáng ấm áp mà còn là một phương tiện để tạo không gian thơm dịu và thư giãn. Mỗi chiếc nến mang theo một câu chuyện riêng, từng giọt sáp tan chảy là một khoảnh khắc của hương thơm êm dịu tràn ngập không gian.\r\nHương thơm từ nến thơm có thể đa dạng, từ những hương trái cây tươi mới, đến những hương hoa nồng nàn hay những hương gỗ ấm áp. Khi nến được đốt, hương thơm dịu nhẹ lan tỏa, tạo ra một bản hòa âm đầy quyến rũ cho không gian xung quanh.\r\nNến thơm không chỉ làm cho không gian trở nên ấm áp và lãng mạn hơn, mà còn có thể giúp giảm căng thẳng và lo lắng, tạo ra một môi trường thư giãn và yên bình. Với nến thơm, mỗi không gian trở nên đặc biệt hơn, mỗi khoảnh khắc trở nên đáng nhớ hơn, tạo ra những trải nghiệm tuyệt vời cho mọi người.\r\n",
                                Information = "Trọng lượng: 30gr/c\r\nNguyên liệu: Sáp đậu nành cao cấp.\r\nKích thước hộp:\r\n+ Hộp 4chiếc: 7x7x4\r\n+ Hộp 1c: 6x6x3\r\nHạn sử dụng: 3 năm kể từ ngày sản xuất\r\nTốc độ tỏa mùi nhanh, bung tỏa hương thơm chỉ trong giây lát\r\nCÔNG DỤNG:\r\n- Nến toả hương thơm ngay cả khi chưa đốt, khử mùi hôi, ẩm mốc trong không gian.\r\n- Nến giải tỏa stress, căng thẳng, mệt mỏi, tăng khả năng tập trung.\r\n- Nến tăng cường kháng khuẩn trong không khí.\r\n",
                                Price = 40000 ,
                                Quantity = GenerateRandomQuantity(random),
                                ProductImages = new List<ProductImage>{
                                    new ProductImage{
                                        ImageUrl = "https://i.imgur.com/ZTisVNI.jpg"
                                    }

                                }
                            },
                             new Product{
                                Name = "Hairclip 8cm",
                                Description = "Nến thơm không chỉ là một nguồn ánh sáng ấm áp mà còn là một phương tiện để tạo không gian thơm dịu và thư giãn. Mỗi chiếc nến mang theo một câu chuyện riêng, từng giọt sáp tan chảy là một khoảnh khắc của hương thơm êm dịu tràn ngập không gian.\r\nHương thơm từ nến thơm có thể đa dạng, từ những hương trái cây tươi mới, đến những hương hoa nồng nàn hay những hương gỗ ấm áp. Khi nến được đốt, hương thơm dịu nhẹ lan tỏa, tạo ra một bản hòa âm đầy quyến rũ cho không gian xung quanh.\r\nNến thơm không chỉ làm cho không gian trở nên ấm áp và lãng mạn hơn, mà còn có thể giúp giảm căng thẳng và lo lắng, tạo ra một môi trường thư giãn và yên bình. Với nến thơm, mỗi không gian trở nên đặc biệt hơn, mỗi khoảnh khắc trở nên đáng nhớ hơn, tạo ra những trải nghiệm tuyệt vời cho mọi người.\r\n",
                                Information = "Trọng lượng: 30gr/c\r\nNguyên liệu: Sáp đậu nành cao cấp.\r\nKích thước hộp:\r\n+ Hộp 4chiếc: 7x7x4\r\n+ Hộp 1c: 6x6x3\r\nHạn sử dụng: 3 năm kể từ ngày sản xuất\r\nTốc độ tỏa mùi nhanh, bung tỏa hương thơm chỉ trong giây lát\r\nCÔNG DỤNG:\r\n- Nến toả hương thơm ngay cả khi chưa đốt, khử mùi hôi, ẩm mốc trong không gian.\r\n- Nến giải tỏa stress, căng thẳng, mệt mỏi, tăng khả năng tập trung.\r\n- Nến tăng cường kháng khuẩn trong không khí.\r\n",
                                Price = 31000  ,
                                Quantity = GenerateRandomQuantity(random),
                                ProductImages = new List<ProductImage>{
                                    new ProductImage{
                                        ImageUrl = "https://i.imgur.com/L9j1kWJ.jpg"
                                    }
                                }
                            },
                            new Product{
                                Name = "Hairclip 7,5cm",
                                Description = "Nến thơm không chỉ là một nguồn ánh sáng ấm áp mà còn là một phương tiện để tạo không gian thơm dịu và thư giãn. Mỗi chiếc nến mang theo một câu chuyện riêng, từng giọt sáp tan chảy là một khoảnh khắc của hương thơm êm dịu tràn ngập không gian.\r\nHương thơm từ nến thơm có thể đa dạng, từ những hương trái cây tươi mới, đến những hương hoa nồng nàn hay những hương gỗ ấm áp. Khi nến được đốt, hương thơm dịu nhẹ lan tỏa, tạo ra một bản hòa âm đầy quyến rũ cho không gian xung quanh.\r\nNến thơm không chỉ làm cho không gian trở nên ấm áp và lãng mạn hơn, mà còn có thể giúp giảm căng thẳng và lo lắng, tạo ra một môi trường thư giãn và yên bình. Với nến thơm, mỗi không gian trở nên đặc biệt hơn, mỗi khoảnh khắc trở nên đáng nhớ hơn, tạo ra những trải nghiệm tuyệt vời cho mọi người.\r\n",
                                Information = "Trọng lượng: 30gr/c\r\nNguyên liệu: Sáp đậu nành cao cấp.\r\nKích thước hộp:\r\n+ Hộp 4chiếc: 7x7x4\r\n+ Hộp 1c: 6x6x3\r\nHạn sử dụng: 3 năm kể từ ngày sản xuất\r\nTốc độ tỏa mùi nhanh, bung tỏa hương thơm chỉ trong giây lát\r\nCÔNG DỤNG:\r\n- Nến toả hương thơm ngay cả khi chưa đốt, khử mùi hôi, ẩm mốc trong không gian.\r\n- Nến giải tỏa stress, căng thẳng, mệt mỏi, tăng khả năng tập trung.\r\n- Nến tăng cường kháng khuẩn trong không khí.\r\n",
                                Price = 28000  ,
                                Quantity = GenerateRandomQuantity(random),
                                ProductImages = new List<ProductImage>{
                                    new ProductImage{
                                        ImageUrl = "https://i.imgur.com/gW6dPAq.jpg"
                                    }
                                }
                            },
                            new Product{
                                Name = "Hairclip 8,3cm",
                                Description = "- Được sử dụng để kẹp tóc, làm phụ kiện và tạo kiểu cho tóc\r\n- Giúp bạn đẹp hơn, nổi bật hơn, phù hợp cho bạn trong nhiều hoạt động\r\n- Giá thành phù hợp để bạn dễ dàng thay đổi phong cách mỗi ngày\r\n- Được làm bằng hợp kim kết hợp các chi tiết đẹp\r\n- Nhỏ gọn, xinh xắn, rất dễ dàng cho việc sử dụng, bảo quan và mang theo mỗi khi di chuyển\r\n",
                                Information = "- Chất liệu: hợp kim\r\n- Màu sắc:  Như ảnh minh họa\r\n- Style: Hàn Quốc\r\n- Trọng lượng: 20g\r\n- Kích thước: tương ứng ở từng sản phẩm\r\n",
                               Price = 36000   ,
                                Quantity = GenerateRandomQuantity(random),
                                ProductImages = new List<ProductImage>{
                                    new ProductImage{
                                        ImageUrl = "https://i.imgur.com/UByhNXz.jpg"
                                    }
                                }
                            },
                        }
                    },
                    new ProductCategory
                    {
                        Name = "Bandana",
                        Products = new List<Product>
                        {
                            new Product{
                                Name = "Màu Trắng",
                                Description = "- Bandana được sử dụng để buộc tóc, làm phụ kiện thời trang\r\n- Giúp bạn đẹp hơn, nổi bật hơn, phù hợp cho bạn trong nhiều hoạt động\r\n- Giá thành phù hợp để bạn dễ dàng thay đổi phong cách mỗi ngày\r\n- Nhỏ gọn, xinh xắn, rất dễ dàng cho việc sử dụng\r\nHướng dẫn giặt và bảo quản :\r\n-Giặt tay nhẹ nhàng \r\n-Phơi tránh ánh nắng trực tiếp. \r\n-Ủi ở nhiệt độ thấp.\r\n",
                                Information = "- Chất liệu:  Ren\r\n- Màu sắc:  màu kem, hồng, xanh\r\n- Style: Hán Quốc\r\n- Trọng lượng: 15g\r\n- Kích thước: khoảng 90*35cm\r\n",
                                Price = 35000,
                                Quantity = GenerateRandomQuantity(random),
                                ProductImages = new List<ProductImage>{
                                    new ProductImage{
                                        ImageUrl = "https://i.imgur.com/BdYFOLP.jpg"
                                    },
                                     new ProductImage{
                                        ImageUrl = "https://i.imgur.com/micwz7l.jpg"
                                    },
                                      new ProductImage{
                                        ImageUrl = "https://i.imgur.com/fhLksxI.jpg"
                                    },
                                       new ProductImage{
                                        ImageUrl = "https://i.imgur.com/cpdIfyT.jpg"
                                    }
                                }
                            },
                            new Product{
                                Name = "Màu Xanh",
                                Description = "- Bandana được sử dụng để buộc tóc, làm phụ kiện thời trang\r\n- Giúp bạn đẹp hơn, nổi bật hơn, phù hợp cho bạn trong nhiều hoạt động\r\n- Giá thành phù hợp để bạn dễ dàng thay đổi phong cách mỗi ngày\r\n- Nhỏ gọn, xinh xắn, rất dễ dàng cho việc sử dụng\r\nHướng dẫn giặt và bảo quản :\r\n-Giặt tay nhẹ nhàng \r\n-Phơi tránh ánh nắng trực tiếp. \r\n-Ủi ở nhiệt độ thấp.\r\n",
                                Information = "- Chất liệu:  Ren\r\n- Màu sắc:  màu kem, hồng, xanh\r\n- Style: Hán Quốc\r\n- Trọng lượng: 15g\r\n- Kích thước: khoảng 90*35cm\r\n",
                                Price = 35000,
                                Quantity = GenerateRandomQuantity(random),
                                ProductImages = new List<ProductImage>{
                                    new ProductImage{
                                        ImageUrl = "https://i.imgur.com/2vDAX9R.jpg"
                                    },
                                     new ProductImage{
                                        ImageUrl = "https://i.imgur.com/micwz7l.jpg"
                                    },
                                      new ProductImage{
                                        ImageUrl = "https://i.imgur.com/fhLksxI.jpg"
                                    },
                                       new ProductImage{
                                        ImageUrl = "https://i.imgur.com/cpdIfyT.jpg"
                                    }
                                }
                            },
                            new Product{
                                Name = "Màu Hồng",
                                Description = "- Bandana được sử dụng để buộc tóc, làm phụ kiện thời trang\r\n- Giúp bạn đẹp hơn, nổi bật hơn, phù hợp cho bạn trong nhiều hoạt động\r\n- Giá thành phù hợp để bạn dễ dàng thay đổi phong cách mỗi ngày\r\n- Nhỏ gọn, xinh xắn, rất dễ dàng cho việc sử dụng\r\nHướng dẫn giặt và bảo quản :\r\n-Giặt tay nhẹ nhàng \r\n-Phơi tránh ánh nắng trực tiếp. \r\n-Ủi ở nhiệt độ thấp.\r\n",
                                Information = "- Chất liệu:  Ren\r\n- Màu sắc:  màu kem, hồng, xanh\r\n- Style: Hán Quốc\r\n- Trọng lượng: 15g\r\n- Kích thước: khoảng 90*35cm\r\n",
                                Price = 35000,
                                Quantity = GenerateRandomQuantity(random),
                                ProductImages = new List<ProductImage>{
                                    new ProductImage{
                                        ImageUrl = "https://i.imgur.com/275NVVJ.jpg"
                                    },
                                     new ProductImage{
                                        ImageUrl = "https://i.imgur.com/micwz7l.jpg"
                                    },
                                      new ProductImage{
                                        ImageUrl = "https://i.imgur.com/fhLksxI.jpg"
                                    },
                                       new ProductImage{
                                        ImageUrl = "https://i.imgur.com/cpdIfyT.jpg"
                                    }
                                }
                            },

                        }
                    }
                );
                try
                {
                    context.SaveChanges();
                }
                catch (Exception ex)
                {
                    Console.WriteLine("Category---------" + ex.Message);
                }
            }
            if (!context.Roles.Any())
            {
                string[] roles = { "Admin", "User", "Blogger" };
                foreach (var role in roles)
                {
                    context.Roles.Add(new IdentityRole
                    {
                        Name = role,
                        NormalizedName = role.ToUpper(),
                        ConcurrencyStamp = Guid.NewGuid().ToString()
                    });

                }
                try
                {
                    context.SaveChanges();
                }
                catch (Exception ex)
                {
                    Console.WriteLine("Role----------" + ex.Message);
                }
            }
            if (!context.Users.Any())
            {
                var user = new ApplicationUser
                {
                    UserName = "admin",
                    Email = "admin@gmail.com",
                    EmailConfirmed = true,
                    SecurityStamp = Guid.NewGuid().ToString("D"),
                    PasswordHash = new PasswordHasher<ApplicationUser>().HashPassword(null!, "123456"),
                    imgUrl = "https://i1.sndcdn.com/artworks-000065334969-gmnp3t-t500x500.jpg",
                };
                context.Users.Add(user);
                const int numberOfUsers = 100;
                for (int i = 0; i < numberOfUsers; i++)
                {
                    string userName = "User" + i;
                    string email = "user" + i + "@example.com";
                    string password = "123456";

                    _ = context.Users.Add(new ApplicationUser
                    {
                        UserName = userName,
                        Email = email,
                        EmailConfirmed = true,
                        NormalizedEmail = email.ToUpper(),
                        NormalizedUserName = userName.ToUpper(),
                        SecurityStamp = Guid.NewGuid().ToString("D"),
                        PasswordHash = new PasswordHasher<ApplicationUser>().HashPassword(null!, password),
                        imgUrl = "https://i1.sndcdn.com/artworks-000065334969-gmnp3t-t500x500.jpg",
                    });
                }
                try
                {
                    context.SaveChanges();
                }
                catch (Exception ex)
                {
                    Console.WriteLine("User-----------" + ex.Message);
                }
            }
            if (!context.ProductComments.Any())
            {
                const int numberOfComments = 300;
                for (int i = 0; i < numberOfComments; i++)
                {
                    int randomProductId = random.Next(1, context.Products.Count());
                    var listUser = context.Users.ToList();
                    var listId = new List<string>();

                    foreach (var user in listUser)
                    {
                        listId.Add(user.Id);
                    }
                    string randomUserId = listId[random.Next(0, listId.Count)];
                    int number = random.Next(0, 5);
                    string contents = "1";
                    switch (number)
                    {
                        case 1:
                            contents = "Sản phẩm rất tuyệt vời phù hợp với giá thành.";
                            break;
                        case 2:
                            contents = "Sản phẩm rất tốt, tôi rất hài lòng với sản phẩm này.";
                            break;
                        case 3:
                            contents = "Tôi rất hài lòng với sản phẩm này.";    
                            break;
                        case 4:
                            contents = "Tuyệt vời quá !";    
                            break;
                        case 5:
                            contents = "Chất lượng sản phẩm rất tuyệt vời 10 điểm.";        
                            break;
                        default:
                            contents = "Hóng ra mắt sản phẩm mới.";
                            break;
                    }
                    context.ProductComments.Add(new ProductComment
                    {
                        Content = contents,
                        ProductId = randomProductId,
                        UserId = randomUserId,
                        CreatedAt = RandomDateTime(2023, 2024)
                    });
                }
                try
                {
                    context.SaveChanges();
                }
                catch (Exception ex)
                {
                    Console.WriteLine("ProductCommnets-----------" + ex.Message);
                }
            }
            if (!context.Coupons.Any())
            {
                const int numberOfCoupons = 5; 
                for (int i = 0; i < numberOfCoupons; i++)
                {
                    context.Coupons.Add(new Coupon
                    {
                        Code = GenerateRandomString(random, 8),
                        DiscountAmount = random.Next(1, 20), 
                        ExpiryDate = RandomDateTime(2023, 2024),
                        Status = ((random.Next(1, 2) == 1) ? true : false)
                    });
                }
                try
                {
                    context.SaveChanges();
                }
                catch (Exception ex)
                {
                    Console.WriteLine("Coupon-----------" + ex.Message);
                }
            }
            if (!context.Orders.Any())
            {
                const int numberOfOrders = 10;
                var userList = context.Users.Select(user => user.Id).ToList();
                var couponCount = context.Coupons.Count();

                for (int i = 0; i < numberOfOrders; i++)
                {
                    string randomUserId = userList[random.Next(userList.Count)]; 
                    bool hasNullCoupon = random.Next(0, 9) == 1; 
                    Order newOrder = new Order
                    {
                        UserId = randomUserId,
                        OrderDate = RandomDateTime(2023, 2024),
                        note = GenerateRandomString(random, 400),
                        Status = RandomStringFromArray(new string[] { "Pending", "Processing", "Completed", "Cancelled", "Delivering" })
                    };

                    if (!hasNullCoupon && couponCount > 0)
                    {
                        newOrder.CouponId = random.Next(1, couponCount + 1); // Chọn ngẫu nhiên một mã giảm giá
                    }
                    context.Orders.Add(newOrder);
                }
                try
                {
                    context.SaveChanges();
                }
                catch (Exception ex)
                {
                    Console.WriteLine("Orders-----------" + ex.Message);
                }
            }
            if (!context.OrderDetails.Any())
            {
                if (context.Orders.Any() && context.Products.Any())
                {
                    const int numberOfOrderDetails = 40; 
                    var orderIds = context.Orders.Select(order => order.Id).ToList();
                    var productIds = context.Products.Select(product => product.Id).ToList();

                    for (int i = 0; i < numberOfOrderDetails; i++)
                    {
                        int randomOrderId = orderIds[random.Next(orderIds.Count)]; 
                        int randomProductId = productIds[random.Next(productIds.Count)]; 
                        int randomQuantity = random.Next(1, 100); 
                        decimal randomPrice = GenerateRandomPrice(random);

                        context.OrderDetails.Add(new OrderDetail
                        {
                            OrderId = randomOrderId,
                            ProductId = randomProductId,
                            Quantity = randomQuantity,
                            UnitPrice = randomPrice
                        });
                    }

                    try
                    {
                        context.SaveChanges();
                    }
                    catch (Exception ex)
                    {
                        Console.WriteLine("OrderDetails-----------" + ex.Message);
                    }
                }
                else
                {
                    Console.WriteLine("Không có đơn hàng hoặc sản phẩm trong cơ sở dữ liệu.");
                }
            }
            if (!context.UserRoles.Any())
            {
                var userList = context.Users.ToList();
                var roleList = context.Roles.ToList();
                foreach (var user in userList)
                {
                    int numberOfRoles = random.Next(1, 4);
                    var selectedRoles = roleList.OrderBy(r => random.Next()).Take(numberOfRoles).ToList();
                    foreach (var role in selectedRoles)
                    {
                        context.UserRoles.Add(new IdentityUserRole<string>
                        {
                            UserId = user.Id,
                            RoleId = role.Id
                        });
                    }
                }
                try
                {
                    context.SaveChanges();
                }
                catch (Exception ex)
                {
                    Console.WriteLine("UserRole-----------" + ex.Message);
                }
            }

            if (!context.BlogPosts.Any())
            {
                context.AddRange(
                    new BlogPost
                    {
                        Title = "Hương Thơm và Sự Thư Giãn: Khám Phá Văn Phòng và Nhà Của Bạn",
                        Content = "Tiếp cận một ngôi nhà hay không gian làm việc thoải mái và ấm áp không chỉ là việc sắp xếp đồ đạc mà còn là việc tạo không khí thích hợp. Trong số những phụ kiện tạo không gian ấy, nến thơm và sáp thơm không chỉ làm cho căn phòng bạn thơm phức mà còn giúp tạo ra một cảm giác thư giãn và yên bình. Hãy cùng khám phá những sản phẩm này và cách chúng có thể làm cho cuộc sống của bạn trở nên tươi mới hơn.\r\n* Nến thơm: Nến thơm không chỉ là nguồn ánh sáng mềm mại mà còn làm cho không gian trở nên ấm áp hơn với hương thơm dễ chịu. Các loại nến thơm có thể được làm từ các thành phần tự nhiên như sáp ong, dầu thơm tự nhiên như hoa hồng, cam bergamot, hoa lavender, hay các loại hương gỗ như sồi và hổ phách. Dù bạn muốn tạo ra một không gian thư giãn sau một ngày làm việc căng thẳng hoặc muốn tạo một không gian lãng mạn cho bữa tối cuối tuần, có một loại nến thơm phù hợp với mọi tình huống.\r\n* Sáp thơm treo: Sáp thơm treo là một lựa chọn khác thú vị cho những người không muốn sử dụng nến. Chúng được làm từ các loại sáp và tinh dầu thơm, được đặt trong các hình dạng nhỏ gọn và treo lên trong không gian. Khi sáp tiếp xúc với không khí, hương thơm tỏa ra một cách dịu dàng và lâu dài. Sự tiện lợi của sáp thơm treo là bạn có thể dễ dàng di chuyển chúng và treo chúng ở bất kỳ nơi nào trong nhà mà bạn muốn.\r\nKhông chỉ mang lại hương thơm dễ chịu, các sản phẩm nến thơm và sáp thơm còn có thể giúp giảm căng thẳng và lo lắng, tạo cảm giác thư giãn và tăng cường tinh thần. Với sự đa dạng về hương thơm và chức năng, chúng là một phần không thể thiếu để tạo ra một không gian sống và làm việc lý tưởng.\r\n\r\n",
                        PostedOn = RandomDateTime(2023, 2024),
                        BlogPostImages = new List<BlogPostImage>
                        {
                            new BlogPostImage
                            {
                                ImageUrl = "https://i.imgur.com/T7GfrC4.jpg"
                            },
                            new BlogPostImage
                            {
                                ImageUrl = "https://i.imgur.com/IIvcCbc.jpg"
                            },
                            new BlogPostImage
                            {
                                ImageUrl = "https://i.imgur.com/3YTBXjR.jpg"
                            },
                            new BlogPostImage
                            {
                                ImageUrl = "https://i.imgur.com/F1ViadK.jpg"
                            }
                        }
                    },
                    new BlogPost
                    {
                        Title = "Tạo Phong Cách với Scrunchies, Bandana và Kẹp Tóc﻿!",
                        Content = "Chào mừng đến với \"Tạo Phong Cách với Scrunchies, Bandana và Kẹp Tóc!\"\r\nBạn đã bao giờ muốn thêm một chút cái gì đó đặc biệt vào phong cách hàng ngày của mình mà không cần quá nhiều công đoạn? Hãy để chúng tôi giới thiệu cho bạn ba sản phẩm nhỏ nhưng đầy phong cách: scrunchies, bandana và kẹp tóc.\r\nScrunchies - Sự Quay Trở Lại của Phong Cách Retro: Được biết đến từ những năm 80 và 90, scrunchies đang trở lại mạnh mẽ trong thế giới thời trang. Khác với những chiếc dây thừng thông thường, scrunchies có thể làm cho bất kỳ búi tóc nào trở nên dễ thương và phong cách hơn. Bạn có thể chọn từ một loạt các chất liệu và màu sắc, từ những mảnh vải mềm mại đến những kiểu da cá tính.\r\nBandana - Sự Đa Dạng và Tiện Lợi: Từ việc đeo trên đầu, sử dụng như một phụ kiện cho túi xách, hoặc thậm chí làm cổ áo, bandana là một mảnh vải linh hoạt có thể tạo ra nhiều phong cách khác nhau. Với các mẫu in độc đáo và màu sắc tươi sáng, bạn có thể biến bất kỳ bộ trang phục nào trở nên thú vị và nổi bật.\r\nKẹp Tóc - Sự Linh Hoạt và Thuận Tiện: Từ những chiếc kẹp đơn giản đến những thiết kế phức tạp hơn, kẹp tóc là một phụ kiện không thể thiếu trong hộp đồ trang điểm của mỗi cô gái. Chúng có thể được sử dụng để tạo kiểu tóc hoặc giữ tóc gọn gàng trong khi làm việc. Với một loạt các kiểu dáng và chất liệu, bạn có thể chọn lựa kẹp tóc phù hợp với bất kỳ phong cách nào.\r\nVới scrunchies, bandana và kẹp tóc, bạn có thể thêm một chút cá tính và sự sáng tạo vào phong cách cá nhân của mình mỗi ngày mà không cần quá nhiều cố gắng. Hãy thử và tạo ra những tổ hợp độc đáo của riêng bạn và khám phá thế giới vô tận của thời trang!\r\n",
                        PostedOn = RandomDateTime(2023, 2024),
                        BlogPostImages = new List<BlogPostImage>
                        {
                            new BlogPostImage
                            {
                                ImageUrl = "https://i.imgur.com/YDQXj4j.jpg"
                            },
                            new BlogPostImage
                            {
                                ImageUrl = "https://i.imgur.com/yrGy6u7.jpg"
                            },
                            new BlogPostImage
                            {
                                ImageUrl = "https://i.imgur.com/pZO2IvP.jpg"
                            }
                        }
                    },
                    new BlogPost
                    {
                        Title = "Hương Thơm: Sự Tinh Tế Trong Cuộc Sống Hàng Ngày",
                        Content = "Hương thơm, dù nhỏ bé, lại là một phần không thể thiếu trong cuộc sống hàng ngày của chúng ta. Từ mùi của cà phê sáng sớm đến hương thơm dịu dàng của hoa quả tươi mới, những hương vị này không chỉ làm cho không gian của chúng ta trở nên thú vị hơn mà còn gợi lại những ký ức đáng nhớ.\r\n*Hương Thơm Trong Gia Đình\r\nTrong gia đình, hương thơm thường được tạo ra từ những món ăn được chuẩn bị hàng ngày. Mùi thơm của bữa sáng nồng nàn từ bánh mì nướng, hương thơm của một nồi canh đầy ấm áp vào buổi tối, hoặc cảm giác dễ chịu từ một ly trà thảo mộc vào buổi tối. Những hương thơm này không chỉ làm cho căn bếp trở nên sống động mà còn kích thích vị giác và mang lại cảm giác bình yên trong gia đình.\r\n*Hương Thơm Trong Làm Việc\r\nTrên nơi làm việc, hương thơm có thể đóng vai trò quan trọng trong việc tạo ra một môi trường làm việc tích cực. Một mùi hương nhẹ nhàng từ cây cỏ hoặc hoa nhài có thể giúp giảm căng thẳng và tăng cường tinh thần cho nhân viên. Ngoài ra, các sản phẩm làm thơm không khí như nến thơm hoặc máy phát hương cũng được sử dụng phổ biến để tạo ra một không gian làm việc thoải mái và tràn ngập hương thơm dễ chịu.\r\n*Hương Thơm Trong Thư Giãn\r\nCuối cùng, hương thơm cũng là một phần quan trọng trong việc thư giãn và tận hưởng cuộc sống. Một bình hoa hồng tươi thắm trong phòng khách, một cây nến lavender phát ra hương thơm dịu dàng trong phòng ngủ, hay một bộ sưu tập tinh dầu thảo mộc để tạo ra không gian spa tại nhà. Những hương thơm này giúp ta tạo ra những khoảnh khắc thư giãn và tận hưởng cuộc sống đúng nghĩa.\r\nTóm lại, hương thơm là một phần không thể thiếu trong cuộc sống hàng ngày của chúng ta, không chỉ làm cho không gian trở nên thú vị hơn mà còn tạo ra những trải nghiệm đầy ý nghĩa và đáng nhớ. Hãy để những hương thơm này dẫn dắt chúng ta qua mỗi ngày và tạo ra những kỷ niệm đẹp trong cuộc sống.\r\n",
                        PostedOn = RandomDateTime(2023, 2024),
                        BlogPostImages = new List<BlogPostImage>
                        {
                            new BlogPostImage
                            {
                                ImageUrl = "https://i.imgur.com/3IrIh7v.jpg"
                            },
                            new BlogPostImage
                            {
                                ImageUrl = "https://i.imgur.com/GV6OUNr.jpg"
                            },
                            new BlogPostImage
                            {
                                ImageUrl = "https://i.imgur.com/LPD5Rx3.jpg"
                            }
                        }
                    },
                    new BlogPost
                     {
                         Title = "Ý Nghĩa của Những Món Quà Nhỏ Bé: Sự Chăm Sóc và Ý Thức Tình Yêu",
                         Content = "Trong cuộc sống, không phải lúc nào những món quà đắt tiền mới là những món quà có ý nghĩa nhất. Thỉnh thoảng, những món quà nhỏ bé, dù đơn giản nhưng chứa đựng những tình cảm sâu sắc và ý thức tình yêu không thể nào đong đếm được. Dưới đây là một số ý nghĩa mà những món quà nhỏ có thể mang lại:\r\n1. Biểu Tượng của Sự Chăm Sóc:\r\nNhững món quà nhỏ như scrunchies, bandana hoặc kẹp tóc có thể là biểu tượng của sự chăm sóc và quan tâm tới người nhận. Dù chúng không có giá trị vật chất lớn, nhưng việc chọn lựa và tặng những món quà như vậy cho người khác thể hiện sự quan tâm và ý thức về sở thích và nhu cầu của họ.\r\n2. Tạo Ra Những Kỷ Niệm Đáng Nhớ:\r\nNhững món quà nhỏ có thể kết hợp với những sự kiện đặc biệt, như ngày kỷ niệm, sinh nhật hoặc những dịp đặc biệt khác. Mặc dù chúng có thể không đắt tiền, nhưng sẽ trở thành những kỷ niệm đáng nhớ và mang lại niềm vui mỗi khi người nhận nhìn thấy hoặc sử dụng chúng.\r\n3. Thể Hiện Sự Quan Tâm và Sự Ý Thức Về Người Nhận:\r\nNhững món quà nhỏ thường đòi hỏi người tặng phải dành thời gian và tâm huyết để lựa chọn và chuẩn bị. Việc này thể hiện sự quan tâm và sự ý thức về người nhận, khiến họ cảm thấy được đánh giá và quý trọng.\r\n4. Mang Lại Sự Sống Động và Hạnh Phúc Hàng Ngày:\r\nNhững món quà nhỏ như scrunchies, bandana hoặc kẹp tóc có thể mang lại sự sống động và hạnh phúc hàng ngày. Mỗi khi người nhận nhìn thấy hoặc sử dụng chúng, họ có thể nhớ đến người tặng và cảm nhận được tình cảm ấm áp mà món quà mang lại.\r\nTrên tất cả, những món quà nhỏ như scrunchies, bandana và kẹp tóc không chỉ là các món đồ thông thường, mà còn là biểu tượng của sự chăm sóc, ý thức và tình yêu. Hãy nhớ rằng, giá trị của một món quà không phụ thuộc vào giá trị vật chất, mà phụ thuộc vào tình cảm và ý nghĩa mà nó chứa đựng.\r\n",
                         PostedOn = RandomDateTime(2023, 2024),
                         BlogPostImages = new List<BlogPostImage>
                        {
                            new BlogPostImage
                            {
                                ImageUrl = "https://i.imgur.com/WBjNNaY.jpg"
                            },
                            new BlogPostImage
                            {
                                ImageUrl = "https://i.imgur.com/3DWjiKF.jpg"
                            }
                        }
                    },
                     new BlogPost
                     {
                         Title = "Sức Mạnh Của Những Phụ Kiện Nhỏ: Kẹp Tóc, Bandana, Scrunchies Và Ảnh Hưởng Đến Vẻ Ngoài Của Bạn",
                         Content = "Trong thế giới của thời trang và phong cách cá nhân, thường xuyên nhiều người dừng lại ở việc tập trung vào việc lựa chọn quần áo, giày dép hoặc túi xách, không nhận ra rằng những phụ kiện nhỏ như kẹp tóc, bandana hay scrunchies cũng chính là những điểm nhấn quan trọng có thể làm thay đổi hoàn toàn cảm nhận về vẻ ngoài của bạn. Một chiếc kẹp tóc nhỏ xinh có thể tạo điểm nhấn đầy cuốn hút cho kiểu tóc của bạn, không chỉ làm cho mái tóc trở nên thanh lịch mà còn giữ cho kiểu tóc gọn gàng, đặc biệt là trong những ngày nắng oi ả. Bandana, một chiếc khăn đa năng, không chỉ làm cho trang phục của bạn thêm phần độc đáo và cá tính nhưng cũng là một cách tuyệt vời để thể hiện phong cách riêng của bạn, với vô số lựa chọn màu sắc và họa tiết. Trong khi đó, scrunchies - chiếc dây buộc tóc từ thập niên 90 đã trở lại với sự phổ biến ngày càng tăng - không chỉ bảo vệ tóc của bạn mà còn tạo điểm nhấn với vẻ ngoài dễ thương và gợi lại phong cách retro đầy cuốn hút. Những phụ kiện nhỏ này không chỉ là một phần nhỏ trong việc tự tin và thể hiện bản thân, mà còn là một phần quan trọng trong việc biến đổi và làm mới phong cách của bạn mỗi ngày. Đừng bao giờ coi thường sức mạnh của những chi tiết nhỏ này - chúng có thể là chìa khóa để bạn tỏa sáng trong mọi tình huống.",
                         PostedOn = RandomDateTime(2023, 2024),
                         BlogPostImages = new List<BlogPostImage>
                         {
                            new BlogPostImage
                            {
                                ImageUrl = "https://i.imgur.com/l7tc18t.jpg"
                            },
                            new BlogPostImage
                            {
                                ImageUrl = "https://i.imgur.com/lDMztLJ.jpg"
                            }
                         }
                    },
                     new BlogPost
                     {
                         Title = "Tại Sao Nến Thơm Là Món Quà Hoàn Hảo Để Tặng Người Yêu",
                         Content = "Khi muốn thể hiện tình cảm đặc biệt với người mình yêu, nến thơm là món quà ý nghĩa và tinh tế. Nến thơm tạo ra không gian lãng mạn với ánh sáng ấm áp và hương thơm dịu nhẹ, hoàn hảo cho những buổi tối bên nhau. Việc chọn mùi hương phù hợp cho thấy bạn hiểu và trân trọng sở thích của người nhận, tạo nên sự kết nối tình cảm sâu sắc. Nến thơm có nhiều mùi hương và thiết kế đa dạng, từ hương hoa nhẹ nhàng như oải hương, hoa nhài đến hương trái cây tươi mát như chanh, cam, dễ dàng tìm thấy loại nến phù hợp với sở thích của người yêu. Hương thơm từ nến còn giúp giảm căng thẳng và cải thiện tâm trạng, mang lại cảm giác thư giãn sau một ngày làm việc mệt mỏi. Mỗi khi thắp nến, người yêu của bạn sẽ nhớ đến những kỷ niệm đẹp mà hai người đã chia sẻ. Nến thơm không phô trương nhưng tinh tế và ý nghĩa, thể hiện sự chu đáo và quan tâm đến từng chi tiết nhỏ trong cuộc sống của người nhận. Chọn nến thơm làm quà tặng là cách gửi gắm tình yêu và lời chúc tốt đẹp đến người yêu một cách nhẹ nhàng và lãng mạn.\r\n\r\n\r\n\r\n\r\n",
                        PostedOn = RandomDateTime(2023, 2024),
                         BlogPostImages = new List<BlogPostImage>
                         {
                            new BlogPostImage
                            {
                                ImageUrl = "https://i.imgur.com/EYmic26.jpg"
                            },
                            new BlogPostImage
                            {
                                ImageUrl = "https://i.imgur.com/vnnszzy.jpg"
                            },
                            new BlogPostImage
                            {
                                ImageUrl = "https://i.imgur.com/DVlo8Ff.jpg"
                            },
                            new BlogPostImage
                            {
                                ImageUrl = "https://i.imgur.com/F1ViadK.jpg"
                            }
                         }
                     },
                     new BlogPost
                     {
                         Title = "Nến Thơm Từ Nguyên Liệu Tự Nhiên: Sự Lựa Chọn Cho Sức Khỏe",
                         Content = "Trong cuộc sống hiện đại, việc tạo ra một không gian sống an lành và thư giãn không chỉ là một ước mơ mà còn là một nhu cầu cần thiết. Và để đảm bảo không chỉ không gian mà còn sức khỏe của chúng ta được bảo vệ, Revibe Co. tự hào giới thiệu dòng sản phẩm nến thơm từ nguyên liệu tự nhiên, là sự lựa chọn hoàn hảo cho sức khỏe của bạn.\r\n\r\n1. An Toàn Cho Sức Khỏe: Nến thơm từ nguyên liệu tự nhiên của chúng tôi được làm từ các thành phần an toàn như sáp đậu nành và sáp ong, không chứa các hóa chất độc hại hay chất phụ gia gây kích ứng. Điều này đảm bảo rằng bạn và gia đình có thể thưởng thức hương thơm mà không cần lo lắng về tác động tiêu cực đến sức khỏe.\r\n2. Không Gây Ô Nhiễm Không Khí: Không giống như các loại nến truyền thống làm từ sáp parafin, nến thơm từ nguyên liệu tự nhiên không tạo ra khói độc hại và các chất khí thải gây ô nhiễm không khí trong nhà. Điều này giúp cải thiện chất lượng không khí và làm cho không gian sống của bạn trở nên trong lành hơn.\r\n3. Tạo Không Gian Thư Giãn: Việc sử dụng nến thơm từ nguyên liệu tự nhiên không chỉ là một phương tiện trang trí mà còn là một cách tuyệt vời để tạo ra một không gian sống thư giãn và yên bình. Hương thơm dịu nhẹ từ nến giúp bạn thư giãn sau một ngày làm việc căng thẳng và tận hưởng những khoảnh khắc bình yên.\r\n\r\nVới những lợi ích đặc biệt mà nến thơm từ nguyên liệu tự nhiên mang lại cho sức khỏe của bạn, hãy để Revibe Co. là người bạn đồng hành đáng tin cậy của bạn trong việc tạo ra một không gian sống an lành và thư giãn. Khám phá thêm về dòng sản phẩm này tại trang web của chúng tôi và bắt đầu hành trình chăm sóc sức khỏe của bạn ngay hôm nay!\r\n",
                        PostedOn = RandomDateTime(2023, 2024),
                         BlogPostImages = new List<BlogPostImage>
                         {
                            new BlogPostImage
                            {
                                ImageUrl = "https://i.imgur.com/T7GfrC4.jpg"
                            },
                            new BlogPostImage
                            {
                                ImageUrl = "https://i.imgur.com/0RCxnTJ.jpg"
                            },
                            new BlogPostImage
                            {
                                ImageUrl = "https://i.imgur.com/IIvcCbc.jpg"
                            }
                         }
                     },
                     new BlogPost
                     {
                         Title = "Câu Chuyện Khởi Nghiệp Của ReVibe Co",
                         Content = "Từ Những Cảm Hứng Ban Đầu...\r\nCó một điều thú vị về nến thơm: nó không chỉ là một nguồn sáng và hương thơm, mà còn mang lại sự ấm cúng, thư giãn, và niềm vui giản dị. Đối với chúng tôi – những người sáng lập ReVibe Co. – tình yêu dành cho nến thơm đã bắt đầu từ những khoảnh khắc giản dị trong cuộc sống hàng ngày: một buổi tối đọc sách bên ánh nến, một không gian làm việc trở nên dễ chịu hơn nhờ hương thơm dịu nhẹ, hay đơn giản là những phút giây thư giãn trong bồn tắm với nến thơm lung linh.\r\nNhưng câu chuyện khởi nghiệp của chúng tôi không chỉ dừng lại ở đam mê dành cho nến thơm. Chúng tôi cũng nhận thấy rằng những phụ kiện như sáp thơm, viên đá hoa anh đào, kẹp tóc, scrunchie, và bandana có thể trở thành những món quà tinh tế, thêm phần hoàn hảo cho trải nghiệm nến thơm. Ý tưởng về ReVibe Co. đã nảy mầm từ mong muốn kết hợp cả hai – những sản phẩm mang lại niềm vui, vẻ đẹp và sự thư giãn cho mọi người.\r\n… Đến Khởi Đầu Đầy Táo Bạo\r\nBan đầu, việc sản xuất và kinh doanh nến thơm và phụ kiện quà tặng dường như là một hành trình đầy thách thức. Chúng tôi không có nhiều kiến thức về sản xuất nến hay tiếp thị phụ kiện. Nhưng với niềm tin rằng sản phẩm của chúng tôi có thể mang lại giá trị thực sự cho khách hàng, chúng tôi đã bắt đầu nghiên cứu, thử nghiệm và học hỏi từng ngày.\r\nChúng tôi bắt đầu bằng việc thử nghiệm các loại sáp nến và hương liệu khác nhau,  tạo ra những cây nến thơm không chỉ đẹp mắt mà còn an toàn cho sức khỏe. Chúng tôi cũng tìm hiểu về các xu hướng phụ kiện thời trang, kết hợp chúng với những món quà tặng độc đáo như kẹp tóc trang nhã, crunchie xinh xắn, và bandana cá tính.\r\n",
                         PostedOn = RandomDateTime(2023, 2024),
                         BlogPostImages = new List<BlogPostImage>
                         {
                            new BlogPostImage
                            {
                                ImageUrl = "https://i.imgur.com/TaNl2Ej.jpg"
                            },
                            new BlogPostImage
                            {
                                ImageUrl = "https://i.imgur.com/C0afSJG.jpg"
                            },
                            new BlogPostImage
                            {
                                ImageUrl = "https://i.imgur.com/3YTBXjR.jpg"
                            },
                            new BlogPostImage
                            {
                                ImageUrl = "https://i.imgur.com/F1ViadK.jpg"
                            }
                         }
                     }

                );
                try
                {
                    context.SaveChanges();
                }
                catch (Exception ex)
                {
                    Console.WriteLine("BlogPosts-----------" + ex.Message);
                }
            }
            if (!context.BlogPostComments.Any())
            {
                const int numberOfBlogPostComments = 100; // Số lượng bình luận muốn tạo
                for (int i = 0; i < numberOfBlogPostComments; i++)
                {
                    int randomBlogPostId = context.BlogPosts.Select(bp => bp.Id).ToList()[random.Next(context.BlogPosts.Count())]; // Chọn ngẫu nhiên một bài viết
                    string randomUserId = context.Users.Select(u => u.Id).ToList()[random.Next(context.Users.Count())]; // Chọn ngẫu nhiên một người dùng

                    context.BlogPostComments.Add(new BlogPostComment
                    {
                        Content = "Comment " + i + GenerateRandomString(random, 200),
                        BlogPostId = randomBlogPostId,
                        UserId = randomUserId,
                        CreatedAt = RandomDateTime(2023, 2024)
                    });
                }
                try
                {
                    context.SaveChanges();
                }
                catch (Exception ex)
                {
                    Console.WriteLine("BlogPostComments-----------" + ex.Message);
                }
            }

        }

        // Phương thức để tạo chuỗi ngẫu nhiên
        private static string GenerateRandomString(System.Random random, int length)
        {
            const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            return new string(Enumerable.Repeat(chars, length)
              .Select(s => s[random.Next(s.Length)]).ToArray());
        }

        // Phương thức để tạo giá ngẫu nhiên
        private static decimal GenerateRandomPrice(System.Random random)
        {
            // Giá từ 10 đến 1000
            return Math.Round((decimal)(random.NextDouble() * (1000 - 10) + 10), 2);
        }

        // Phương thức để tạo số lượng ngẫu nhiên
        private static int GenerateRandomQuantity(System.Random random)
        {
            // Số lượng từ 1 đến 100
            return random.Next(1, 101);
        }
        private static DateTime RandomDateTime(int startYear, int endYear)
        {
            Random random = new Random();
            DateTime startDate = new DateTime(startYear, 1, 1);
            DateTime endDate = new DateTime(endYear + 1, 1, 1).AddDays(-1); // Trừ đi 1 ngày để kết thúc ở cuối năm trước đó.
            TimeSpan timeSpan = endDate - startDate;
            TimeSpan randomSpan = new TimeSpan(0, random.Next(0, (int)timeSpan.TotalMinutes), 0);
            return startDate + randomSpan;
        }
        private static string RandomStringFromArray(string[] array)
        {
            Random random = new Random();
            if (array == null || array.Length == 0)
            {
                throw new ArgumentException("Mảng chuỗi không hợp lệ.");
            }

            int randomIndex = random.Next(0, array.Length);
            return array[randomIndex];
        }
        private static List<BlogPostComment> GenerateRandomComments(ApplicationDbContext context)
        {
            Random random = new Random();
            int commentCount = random.Next(1, 11); // Generate a random number between 1 and 10
            List<string> userIds = context.Users.Select(u => u.Id).ToList();
            List<BlogPostComment> comments = new List<BlogPostComment>();
            for (int i = 0; i < commentCount; i++)
            {
                comments.Add(new BlogPostComment
                {
                    Content = $"Bình luận {i + 1}",
                    UserId = userIds[random.Next(userIds.Count)],
                    CreatedAt = RandomDateTime(2023, 2024)
                });
            }

            return comments;
        }
    }
}
