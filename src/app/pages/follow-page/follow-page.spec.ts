import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FollowPage } from './follow-page';

describe('FollowPage', () => {
  let component: FollowPage;
  let fixture: ComponentFixture<FollowPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FollowPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FollowPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
