/**
 *  문항 템플릿 관리 - Controller
 *
 * @author kang.deokjoon
 * @version 1.0
 * @since 2017-07-24
 */
package com.app.controller.admin;

import java.util.List;

import javax.annotation.Resource;
import javax.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.common.controller.CommonRestController;
import com.app.common.models.ResponseListVO;
import com.app.models.ItemTemplateListRequestVO;
import com.app.models.ItemTemplateListSaveVO;
import com.app.models.ItemTemplateListVO;
import com.app.service.ItemTemplateService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;

@RestController
@Slf4j
@Api(value = "ItemTemplateController", tags = "문항 템플릿 관리")
@RequestMapping("/admin")
public class ItemTemplateController extends CommonRestController {
  
  @Resource
  private ItemTemplateService itemTemplateService;
  
  @ApiOperation(value = "문항 템플릿 관리 - 리스트", notes = "문항 템플릿 리스트")
  @GetMapping(path = "/template/items")
  public ResponseEntity<ResponseListVO> getItemTemplateListSearch(@Valid ItemTemplateListRequestVO itemTemplateListRequestVO) throws Exception {
    
    List<ItemTemplateListVO> list = itemTemplateService.getItemTemplateList(itemTemplateListRequestVO);
    
    ResponseListVO responseListVO = new ResponseListVO(0, 0, 0, list);
    
    return new ResponseEntity<ResponseListVO>(responseListVO, HttpStatus.OK);
  }
  
  @ApiOperation(value = "문항 템플릿 관리 - 등록", notes = "문항 템플릿 등록")
  @PostMapping(path = "/template/items", produces = {MediaType.APPLICATION_JSON_VALUE})
  public ResponseEntity saveItemTemplate(@RequestBody @Valid ItemTemplateListSaveVO itemTemplateListSaveVO) throws Exception {
    
    int result = itemTemplateService.saveItemTemplate(itemTemplateListSaveVO);
    
    return new ResponseEntity(result, HttpStatus.OK);
  }
}
