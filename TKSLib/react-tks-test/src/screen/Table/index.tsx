import React, { FC, useState, useEffect } from 'react';
import './styles.css';

import Table from 'src/components/Table';
import Table1 from 'src/components/Table1';

import { 
    ColumnsInforProps,
    Table_Data_CustomColumn_DataIn_Type,
    Table1_Config_ColumnInfor_Props 
} from 'src/define';
import { LOAD_STATE } from 'src/const';



const TableScreen: FC<{}> = () => {

    const [loadDataState, setLoadDataState] = useState<string | undefined>(undefined);
    const [page, setPage] = useState<number>(1);
    // const [customColumnData, setCustomColumnData] = useState<Table_Data_CustomColumn_DataIn_Type>({field: 'test', data: ''});
    const [customColumnDatas, setCustomColumnDatas] = useState<Table_Data_CustomColumn_DataIn_Type[]>([]);

    useEffect(() => {
        // let i: number = 0; 
        // const interval = setInterval(() => {
        //     setCustomColumnData(pre => {
        //         return {
        //             ...pre,
        //             data: i.toString()
        //         }
        //     })
        //     // i++
        //     clearInterval(interval)
        // }, 1000)
    }, [])

    const columnsInfor: ColumnsInforProps[] = [
        { columnName: 'Name', fieldName: 'name'},
        { columnName: 'Age', fieldName: 'age'},
        { columnName: 'Address', fieldName: 'address'},
        { columnName: 'Page', fieldName: 'page'},
        { columnName: 'Phone', fieldName: 'phone'}
    ]

    const columnsInfor1: Table1_Config_ColumnInfor_Props[] = [
        { columnName: 'Name', fieldName: 'name'},
        { columnName: 'Age', fieldName: 'age'},
        { columnName: 'Address', fieldName: 'address'},
        { columnName: 'Page', fieldName: 'page'},
        { columnName: 'Phone', fieldName: 'phone'}
    ]

    const data = (page: number) => {
        return [
            {
                name: 'name 1',
                age: '1',
                address: 'address 1',
                page: page
            },
            {
                name: 'name 2',
                age: '2',
                address: 'address 2',
                page: page
            },
            {
                name: 'name 3',
                age: '3',
                address: 'address 3',
                page: page
            },
            {
                name: 'name 4 ​John Grinder và Richard Bandler – hai giáo sư đại học Santa Cruz (Mỹ) – được xem là những người sáng lập ra NLP (Lập Trình Ngôn Ngữ Tư Duy) để cải thiện kỹ năng con người thông qua việc tạo ra những mô thức hành động tốt hơn.Những người sáng lập ra LTNNTD đã nhận thấy rằng, mọi người không phản ứng trực tiếp với thế giới chung quanh họ. Trước tiên, họ dùng những gì thu nhận được từ thế giới bên ngoài trong tiến trình sống và lớn lên để lập trình cho bộ não của mình, rồi cứ thế mà phản ứng theo các chương trình đã được cài sẵn đó. Ví dụ, một người đã từng thất bại trong nhiều lần “thử thời vận” nói chuyện trước công chúng, rồi những người chung quanh chê bai “có vậy mà cũng đòi ăn nói”, tự nhiên họ sẽ lập trình cho mình là “kẻ bất tài trong khâu ăn nói”. Nếu học được cách thay đổi những chương trình cài sẵn đó, họ mới thay đổi được “thế giới của họ”. Không ai là khiếm khuyết cả, chỉ có các chương trình cài đặt bị khiếm khuyết mà thôi!.NLP là viết tắt của Neuro-Linguistic Programming (Lập Trình Ngôn Ngữ Tư Duy). Nó chứa đựng ba thành tố có ảnh hưởng lớn nhất đến việc hình thành những kinh nghiệm cá nhân của mỗi chúng ta: thần kinh học, ngôn ngữ học, và các mô thức được lập trình sẵn.Chúng ta giao tiếp với thế giới bên ngoài thông qua 5 giác quan: thị giác, thính giác, xúc giác, khứu giác, và vị giác. Chúng ta tiếp nhận những tác nhân kích thích từ bên ngoài, và tái tạo lại chúng bên trong não bộ dưới một hình thức khác. Việc này hình thành bên trong não bộ chúng ta một thế giới thu nhỏ và chủ quan của riêng chúng ta. Việc tổng hợp tất cả những gì ta thu nhận từ bên ngoài vào não bộ tạo nên những mô thức hành vi và phản ứng trong các hoàn cảnh khác nhau của cuộc sống, việc này còn được gọi là “lập trình”. Những mô thức (hay gọi một cách đơn giản là thói quen) này sẽ lặp đi lặp lại nếu không có cản trở hay thay đổi gì. Nó giống như máy ghi âm tua lại cùng một nội dung nếu như nó không bao giờ được ghi âm nội dung khác chồng lên. Vấn đề là ở chỗ, những mô thức lặp đi lặp lại này có những cái rất hữu ích nhưng có những cái thì hoàn toàn không (hoặc thậm chí có hại)',
                age: '4',
                address: 'address 4',
                phone: '0789860854',
                page: page
            }
        ]
    } 

    return <div className="TKS-screen-Table">
        <button onClick={() => setPage(x => x + 1)}>Plus page</button>
        <button onClick={() => setPage(0)}>click</button>
        <div style={{marginLeft: '20px', width: '800px', marginBottom: '50px'}}>
            <Table table={{
                data: {
                    values: data(page),
                    customColumn: {
                        values: customColumnDatas
                    }
                },
                config: {
                    columnsInfor: columnsInfor, 
                    pageSize: 4, 
                    maxRow: 4*20, 
                    cell: {width: '250px', height: '30px'},
                    customColumn: {
                        type: 'calculateMoney',
                        fields: ['COST', 'VAT', 'SALE']
                    }
                },
                control: {loadDataState: loadDataState, pageIndex: page},
                event: {
                    onSelectedPage(TKS) {
                        setLoadDataState(LOAD_STATE.LOADING);
                        const interval = setInterval(() => {
                            const pageIndex_m = TKS.data.selectedPage;
                            setPage(pageIndex_m)
                            setLoadDataState(LOAD_STATE.SUCCESS);
                            clearInterval(interval)
                        }, 2000)
                    },
                    customColumn: {
                        onInputChange(e) {
                            setCustomColumnDatas([
                                {field: 'COST', data: e.target.value},
                                {field: 'VAT', data: e.target.value},
                                {field: 'SALE', data: e.target.value}
                            ])
                        },
                        onInput(TKS) {
                            // console.log(111, TKS.data)
                        },
                    }
                }
            }} />
        </div>
        <div style={{marginLeft: '50px'}}>
            <Table1
                table1={{
                    config: {
                        columnInfor: columnsInfor1
                    },
                    data: {
                        values: data(page)
                    }
                }}
            />
        </div>
    </div>;
};

export default TableScreen;