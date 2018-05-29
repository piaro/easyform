
$(function()
{

    // class | constructor
    Easyform = function()
    {
        this.dataClassName = 'easyform';
    };

    getEasyform = function()
    {
        return new Easyform;
    }

    /**
    * Get All Value from Form
    *
    * 指定したデータタグが存在しない場合は、Key・値ともにUndefinedを返却する
    *
    * @author chihiro_yamamoto
    * @param formId どのフォームかをidで指定
    * @param nameAttr keyとなる文字列をどの属性から取得するか指定（default:name)
    *                    data属性を使う場合は、'data-'以降の文字列を指定
                        ex) data-aa-bb の場合は、 'aa-bb'
    * @param valueAttr 値をどの属性から取得するか指定（default:value)
                        data属性を使う場合は、'data-'以降の文字列を指定
                        ex) data-aa-bb の場合は、 'aa-bb'
    *@param isNameCustomized keyとなる文字列の取得先属性がdata属性の場合、true（default:false)
    *@param isValueCustomized 値の取得先属性がdata属性の場合、true（default:false)
    *
    */
    Easyform.prototype.getFormValues = function(formId, nameAttr='name', valueAttr='value', isNameCustomized=false, isValueCustomized=false)
    {
        try
        {
            return this._getFormValues(formId, nameAttr, valueAttr, isNameCustomized, isValueCustomized);
        }
        catch (e)
        {
            alert("Error was occured from Easyform");
        }
    }

    Easyform.prototype._getFormValues = function(formId, nameAttr='name', valueAttr='value', isNameCustomized=null, isValueCustomized=null)
    {
        var returnArray = {};
        var form = $('form#test-form');
        var formName = 'form#'+formId;

        className = this.dataClassName;

        // getVal
        // dataAttr
        if(isValueCustomized == true)
        {
            var getVal = function(target)
            {
                return $(target).data(valueAttr);
            }
        }
        // value
        else if(valueAttr == 'value')
        {
            var getVal = function(target)
            {
                return $(target).val();
            }
        }
        // others (Error)
        else
        {
            throw Exception;
        }

        // getName
        // dataAttr
        if(isNameCustomized == true)
        {
            var getName = function(target)
            {
                return $(target).data(nameAttr);
            }
        }
        // value
        else if(nameAttr == 'name')
        {
            var getName = function(target)
            {
                return $(target).attr('name');
            }
        }
        // value
        else if(nameAttr == 'id')
        {
            var getName = function(target)
            {
                return $(target).attr('id');
            }
        }
        // others (Error)
        else
        {
            throw Exception;
        }

        $(formName + " input").each(function()
        {
            if ($(this).hasClass(className))
            {
                // case radio
                if($(this).is(':radio'))
                {
                    if($(this).is(':checked'))
                    {
                        returnArray[getName(this)] = getVal(this);
                    }
                }
                // case checkbox
                else if($(this).is(':checkbox'))
                {
                    if($(this).is(':checked')) {
                        returnArray[getName(this)] = 'true';
                    } else {
                        returnArray[getName(this)] = 'false';
                    }
                }
                // others (mainly this is for text)
                else
                {
                    returnArray[getName(this)] = getVal(this);
                }
            }
        });

        // case select
        $(formName + " select").each(function()
        {
            if ($(this).hasClass(className))
            {
                returnArray[getName(this)] = getVal(this);
            }
        });

        // case textarea
        $(formName + " textarea").each(function()
        {
            if ($(this).hasClass(className))
            {
                returnArray[getName(this)] = getVal(this);
            }
        });

        return returnArray;
    };



    // test code
    // var penguin = getEasyform();
    //
    // $('input[name=1]').on('click',function(){
    //     var resultArray = penguin.getAll('test-form');
    //     console.log(resultArray);
    // });
    // $('input[name=2]').on('click',function(){
    //     var resultArray = penguin.getAll('test-form', 'id');
    //     console.log(resultArray);
    // });
    // $('input[name=3]').on('click',function(){
    //     var resultArray = penguin.getAll('test-form', 'id', 'value', true);
    //     console.log(resultArray);
    // });
    // $('input[name=4]').on('click',function(){
    //     var resultArray = penguin.getAll('test-form', 'id', 'value', true, true);
    //     console.log(resultArray);
    // });

});
